const LikeButtonPresenter = {
    async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = favoriteRestaurants;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderUnlike();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = /*html*/ `
        <button id="add-to-favorite" class="button-love" aria-label="like this restaurant">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span class="love-text">Tambah ke Favorit</span>
        </button>
        `;

        const likeButton = this._likeButtonContainer.firstElementChild;
        likeButton.addEventListener('click', this._buttonPutHandler.bind(this));
    },

    _renderUnlike() {
        this._likeButtonContainer.innerHTML = /*html*/ `
        <button id="add-to-favorite" class="button-love" aria-label="unlike this restaurant">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span class="love-text">Tambah ke Favorit</span>
            </button>
        `;

        const likeButton = this._likeButtonContainer.firstElementChild;
        likeButton.addEventListener('click', this._buttonDeleteHandler.bind(this));
    },

    async _buttonPutHandler() {
        await this._favoriteRestaurants.putRestaurant(this._restaurant);
        await this._renderButton();
    },

    async _buttonDeleteHandler() {
        await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
        await this._renderButton();
    },
};

export default LikeButtonPresenter;
