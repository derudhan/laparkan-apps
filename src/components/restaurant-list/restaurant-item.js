import cardStyle from '!!css-loader!sass-loader!../../styles/homepage/restaurant-item.scss';
import RestaurantAPI from '../../scripts/data/restaurantAPI';
const hrefLink = (id) => `#/detail/${id}`;

class RestaurantItem extends HTMLElement {
    restaurant = {
        id: null,
        name: '-',
        description: '-',
        city: '-',
        address: '-',
        pictureId: '-',
        categories: [{ name: '-' }],
        menus: {
            foods: [{ name: '-' }],
            drinks: [{ name: '-' }],
        },
        rating: '-',
        customerReviews: [{ name: '-', review: '-', date: '-' }],
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
        // prettier-ignore
        this._template.innerHTML = /*html*/ `
        <article class="card">
            <figure>
                <picture>
                    <source media="(max-width: 600px)" data-srcset="${RestaurantAPI.getImage(this.restaurant.pictureId, 'small')}">
                    <source media="(min-width: 1024px)" data-srcset="${RestaurantAPI.getImage(this.restaurant.pictureId, 'large')}">
                    <img src="${RestaurantAPI.getImage(this.restaurant.pictureId, 'medium')}" alt="${this.restaurant.name}" loading="lazy"/>
                </picture>
            </figure>
            <div class="card-body">
                <div class="card-header">
                    <div class="header-left">
                        <a href="${hrefLink(this.restaurant.id)}" class="card-title">${this.restaurant.name}</a>
                        <p class="card-sub">${this.restaurant.city}</p>
                    </div>
                    <div class="header-right">
                        <svg class="stars" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="ratings">${this.restaurant.rating}</p>
                    </div>
                </div>
                <p class="card-desc">${this.restaurant.description}</p>
                <a href="${hrefLink(this.restaurant.id)}" class="read-more">
                    Baca Selengkapnya <span class="sr-only">about ${this.restaurant.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right icon"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                </a>
            </div>
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

customElements.define('restaurant-item', RestaurantItem);
