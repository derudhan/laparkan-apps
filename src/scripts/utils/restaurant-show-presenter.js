class RestaurantShowPresenter {
    constructor({ view, favoriteRestaurants }) {
        this._view = view;
        this._favoriteRestaurants = favoriteRestaurants;

        this._showRestaurants();
    }

    async _showRestaurants() {
        const restaurants = await this._favoriteRestaurants.getAllRestaurants();
        this._displayRestaurants(restaurants);
    }

    _displayRestaurants(restaurants) {
        this._view.showRestaurant(restaurants);
    }
}

export default RestaurantShowPresenter;
