import cardStyle from '!!css-loader!sass-loader!../../styles/detailpage/reviews-item.scss';

class ReviewItem extends HTMLElement {
    review = {
        name: null,
        review: null,
        date: null,
    };

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this._template = document.createElement('template');
    }

    static get observedAttributes() {
        return [''];
    }

    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {}

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
        this._style.innerHTML = cardStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <article class="card">
                <div class="reviewer">
                    <div class="name-and-date">
                        <h2 class="review-name">${this.review.name}</h2>
                        <p class="review-date">${this.review.date}</p>
                    </div>
                </div>
                <p class="review-comment">${this.review.review}</p>
            </article>
        `;
    }

    _render() {
        this._resetComponent();
        this._updateStyle();
        this._updateTemplate();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    }
}

customElements.define('review-item', ReviewItem);
