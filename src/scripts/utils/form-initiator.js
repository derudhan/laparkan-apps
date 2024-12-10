import RestaurantAPI from '../data/restaurantAPI';
import App from '../views/app';

const FormInitiator = {
    init({ rootElement, restaurantId }) {
        this._rootElement = rootElement;
        this._restaurantId = restaurantId;
        this._form = rootElement.querySelector('form');
        this._formElements = this._form.elements;

        this._apiInteractionHandler = this._apiInteractionHandler.bind(this);
        this._form.addEventListener('submit', this._apiInteractionHandler);
        this._inputValidationHandler(this._formElements, rootElement);

        return () => {
            this._form.removeEventListener('submit', this._apiInteractionHandler);
        };
    },

    _apiInteractionHandler(e) {
        e.preventDefault();

        if (!this._form.checkValidity()) {
            import('sweetalert2').then((Swal) => {
                Swal.default.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Form tidak valid!',
                });
            });
            return;
        }

        const review = {
            id: this._restaurantId,
            name: this._formElements.username.value,
            review: this._formElements.body.value,
        };

        RestaurantAPI.addReview(review).then(() => {
            import('sweetalert2').then((Swal) => {
                Swal.default
                    .fire({
                        icon: 'success',
                        title: 'Terima kasih',
                        text: 'Review kamu berhasil ditambahkan!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    })
                    .then(() => {
                        const app = new App({ mainContent: document.getElementById('main-content') });
                        app.renderPage();
                    });
            });
        });

        this._form.reset();
    },

    _inputValidationHandler(formElements, rootElement) {
        for (const el in formElements) {
            if (Object.prototype.hasOwnProperty.call(formElements, el)) {
                const getElement = formElements[el];
                getElement.addEventListener('invalid', (e) => {
                    this._customValidationHandler(e);
                    this._validate(e, rootElement);
                });
                getElement.addEventListener('input', (e) => {
                    this._customValidationHandler(e);
                    this._validate(e, rootElement);
                });
            }
        }
    },

    _customValidationHandler(e) {
        e.target.setCustomValidity('');
        if (e.target.validity.valueMissing) {
            e.target.setCustomValidity('Wajib di isi!');
            return;
        }
        if (e.target.validity.tooShort) {
            e.target.setCustomValidity(`Minimal ${e.target.getAttribute('minlength')} karakter!`);
            return;
        }
        if (e.target.validity.tooLong) {
            e.target.setCustomValidity(`Maksimal ${e.target.getAttribute('maxlength')} karakter!`);
            return;
        }
        if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity('Hanya boleh berisi huruf, angka, titik, dan garis bawah');
            return;
        }
    },

    _validate(e, element) {
        const isValid = e.target.validity.valid;
        const errorMessage = e.target.validationMessage;

        const connectedValidationId = e.target.getAttribute('aria-describedby');
        const connectedValidationEl = connectedValidationId ? element.getElementById(connectedValidationId) : null;

        if (connectedValidationEl && errorMessage && !isValid) {
            connectedValidationEl.innerText = errorMessage;
        } else {
            connectedValidationEl.innerText = '';
        }
    },
};

export default FormInitiator;
