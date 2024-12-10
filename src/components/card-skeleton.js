import style from '!!css-loader!sass-loader!../styles/general/card-skeleton.scss';

class CardSkeleton extends HTMLElement {
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
        this._style.innerHTML = style.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <div class="card-skeleton">
                <div class="image"></div>
                <div class="content">
                    <h2></h2>
                    <p></p>
                </div>
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

customElements.define('card-skeleton', CardSkeleton);
