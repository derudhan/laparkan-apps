import heroStyle from '!!css-loader!sass-loader!../styles/homepage/hero.scss';

class HomeHero extends HTMLElement {
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
        this.style.setProperty('width', '100%');
        this._style.innerHTML = heroStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <div class="app-jumbotron section-upper">
                <picture>
                    <source media="(max-width: 600px)" type="image/webp" srcset="./images/hero-image-small.webp">
                    <source media="(max-width: 600px)" type="image/jpeg" srcset="./images/hero-image-small.jpg">
                    <source type="image/webp" srcset="./images/hero-image-large.webp">
                    <img src="./images/hero-image-large.jpg" alt="Gambar chef sedang menyiapkan hidangan" class="jumbotron-image">
                </picture>
                <div class="jumbotron-filter"></div>
                <h2 class="jumbotron-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat chef-icon"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
                    Cari <span class="title-color-effect">restoran</span> terdekat dan isi perutmu
                    <span class="sr-only">menuju ke list restoran</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-from-line icon"><path d="M19 3H5"/><path d="M12 21V7"/><path d="m6 15 6 6 6-6"/></svg>
                </h2>
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

customElements.define('home-hero', HomeHero);
