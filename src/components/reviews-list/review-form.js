import formStyle from '!!css-loader!sass-loader!../../styles/detailpage/review-form.scss';
import buttonStyle from '!!css-loader!sass-loader!../../styles/general/button.scss';
import urlParser from '../../scripts/routes/url-parser';

import FormInitiator from '../../scripts/utils/form-initiator';

class ReviewForm extends HTMLElement {
    _formListenerRemover = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({
            mode: 'open',
        });
        this._style = document.createElement('style');
        this._template = document.createElement('template');

        this._iconColor = this.getAttribute('icon-color');
    }

    static get observedAttributes() {
        return ['icon-color'];
    }

    connectedCallback() {
        this.render();
        this._shadowRoot.querySelector('textarea').addEventListener('input', this._autoGrow);

        const url = urlParser.parseActiveUrlIwithoutCombiner();
        this._formListenerRemover = FormInitiator.init({
            rootElement: this._shadowRoot,
            restaurantId: url.id,
        });
    }

    disconnectedCallback() {
        this._shadowRoot.querySelector('textarea').removeEventListener('input', this._autoGrow);
        this._formListenerRemover();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[`_${name}`] = newVal;
            this._render();
        }
    }

    _resetComponent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this.style = 'width: 100%; display: flex; justify-content: center; align-items: center;';
        this.classList.add('section');
        this._style.textContent = formStyle.toString();
        this._style.textContent += buttonStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
        <div class="card layout">
            <div class="card-title">
                <h1>
                    <slot name="card-title">Tambah Review Kamu</slot>
                </h1>
                <div class="h-line"></div>
            </div>
            <form id="card-form" class="card-form">
                <div class="form-element">
                    <label for="username">
                        <slot name="username">Nama Penulis</slot>
                    </label>
                    <input type="text" id="username" placeholder="Masukkan judul..." minlength="4" pattern="[a-zA-Z0-9_ .]+" aria-describedby="titleValidate" required>
                    <p id="titleValidate" class="validateText" aria-live="polite"></p>
                </div>
                <div class="form-element">
                    <label for="body">
                        <slot name="body">Review Kamu</slot>
                    </label>
                    <textarea type="text" id="body" placeholder="Masukkan isi note..." minlength="6" maxlength="255" aria-describedby="bodyValidate" required></textarea>
                    <p id="bodyValidate" class="validateText" aria-live="polite"></p>
                </div>
                <button class="button btn" type="submit">
                    <slot name="button-text">KIRIM</slot>
                </button>
            </form>
        </div>
        `;
    }

    _autoGrow() {
        this.style.height = '3rem';
        this.style.height = `${this.scrollHeight}px`;
    }

    render() {
        this._resetComponent();
        this._updateStyle();
        this._updateTemplate();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    }
}
customElements.define('review-form', ReviewForm);
