import contentStyle from '!!css-loader!sass-loader!../../styles/detailpage/reviews-list.scss';

class ReviewsList extends HTMLElement {
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
        this._style.innerHTML = contentStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <div class="container section">
                <h1 class="app-reviews-title"><span class="title-color-effect">Review</span> Pelanggan</h1>
                <h2 class="app-reviews-sub">Mari dengar dari para pelanggan terkait restoran ini.</h2>
                <section id="app-reviews" class="app-reviews container">
                    <slot></slot>
                </section>
            </div>
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

customElements.define('reviews-list', ReviewsList);
