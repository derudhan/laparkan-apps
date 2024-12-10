import contentStyle from '!!css-loader!sass-loader!../../styles/homepage/restaurant-list.scss';

class RestaurantsList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this._template = document.createElement('template');

        this._titleSuffix = '';
    }

    static get observedAttributes() {
        return ['title-suffix'];
    }

    connectedCallback() {
        this._titleSuffix = this.getAttribute('title-suffix') || ' ';
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
        this.id = 'app-daftar-restoran';
        this._style.innerHTML = contentStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <h1 class="app-content-title">Daftar <span class="title-color-effect">Restoran</span> ${this._titleSuffix}</h1>
            <section class="app-daftar-restoran container">
                <slot></slot>
            </section>
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

customElements.define('restaurant-list', RestaurantsList);
