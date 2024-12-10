import detailStyle from '!!css-loader!sass-loader!../styles/detailpage/detail.scss';
import RestaurantAPI from '../scripts/data/restaurantAPI';
import LikeButtonPresenter from '../scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../scripts/data/favorite-restaurant-idb';

class DetailPage extends HTMLElement {
    restaurant = {
        id: null,
        name: null,
        description: null,
        city: null,
        address: null,
        pictureId: null,
        categories: [{ name: null }],
        menus: {
            foods: [{ name: null }],
            drinks: [{ name: null }],
        },
        rating: null,
        customerReviews: [{ name: null, review: null, date: null }],
    };

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this._template = document.createElement('template');

        this._badgeColor = this.getAttribute('badge-color') || 'gray';
    }

    static get observedAttributes() {
        return ['badge-color'];
    }

    connectedCallback() {
        this._render();
        LikeButtonPresenter.init({
            likeButtonContainer: this._shadowRoot.getElementById('like-container'),
            favoriteRestaurants: FavoriteRestaurantIdb,
            restaurant: this.restaurant,
        });
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
        this.id = 'content';
        this.classList.add('container', 'section-upper');
        this._style.innerHTML = detailStyle.toString();
        this._style.innerHTML += /*css*/ `
            .info__badge {
                background: ${this._badgeColor};
            }
        `;
    }

    _updateTemplate() {
        // prettier-ignore
        this._template.innerHTML = /*html*/ `
            <div class="restaurant__head">
                <h2 class="head__title">${this.restaurant.name}</h2>
                <div class="head__misc">
                    <div class="misc__rating">
                        <p class="rating__title">Rating</p>
                        <svg class="rating__stars" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="rating__number">${this.restaurant.rating}/5</p>
                    </div>
                    <hr />
                    <div id="like-container" class="like-container"></div>
                </div>
            </div>

            <div class="restaurant__hero">
                <div class="hero__banner">
                    <picture>
                        <source media="(max-width: 600px)" data-srcset="${RestaurantAPI.getImage(this.restaurant.pictureId, 'small')}">
                        <source media="(max-width: 1024px)" data-srcset="${RestaurantAPI.getImage(this.restaurant.pictureId, 'medium')}">
                        <img class="banner_picture" src="${RestaurantAPI.getImage(this.restaurant.pictureId)}" alt="${this.restaurant.name}" loading="lazy" />
                    </picture>
                </div>
                <div class="hero__info">
                    <h4>Nama Restoran</h4>
                    <p>${this.restaurant.name}</p>
                    <h4>Kota</h4>
                    <p>${this.restaurant.city}</p>
                    <h4>Alamat</h4>
                    <p>${this.restaurant.address}</p>
                    <h4>Kategori</h4>
                    <p class="info__badge-list">${this._createBadgefromList(this.restaurant.categories)}</p>
                </div>
            </div>

            <div class="restaurant__misc section">
                <div class="misc__description">
                    <h3>Deskripsi</h3>
                    <p>${this.restaurant.description}</p>
                </div>

                <div class="misc__menu section">
                    <h3>Pilihan Menu yang Tersedia</h3>
                    <div class="menu__list">
                        <h4>Makanan</h4>
                        <p class="info__badge-list">${this._createBadgefromList(this.restaurant.menus.foods)}</p>
                        <h4>Minuman</h4>
                        <p></p>
                        <p class="info__badge-list">${this._createBadgefromList(this.restaurant.menus.drinks)}</p>
                    </div>
                </div>
            </div>
        `;
    }

    _createBadgefromList(datas) {
        return datas
            .map((data) => {
                return /*html*/ `
                <span class="info__badge">${data.name}</span>
            `;
            })
            .join('');
    }

    _render() {
        this._resetComponent();
        this._updateStyle();
        this._updateTemplate();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    }
}

customElements.define('page-detail', DetailPage);
