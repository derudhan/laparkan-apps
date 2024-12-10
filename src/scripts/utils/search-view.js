class RestaurantSearchView {
    getTemplate(suffix = '', addClass = '') {
        return /* html */ `
        <div id="favContent" class="content section-upper section-lower">
            <div class="search-query section-upper">
                <label for="query" class="query-label">Cari Restoran Favorit Kamu</label>
                <input id="query" type="text" class="query-input">
            </div>

            <restaurant-list title-suffix="${suffix}" class="${addClass}"></restaurant-list>
        </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    async showRestaurant(restaurants) {
        const restaurantListElement = document.querySelector('restaurant-list');
        restaurantListElement.innerHTML = '<card-skeleton></card-skeleton>';

        const restaurantItem = restaurants.map((restaurant) => {
            const card = document.createElement('restaurant-item');
            card.restaurant = restaurant;
            return card;
        });

        restaurantListElement.innerHTML = '';
        if (restaurantItem.length === 0) {
            restaurantListElement.innerHTML = this._getEmptyRestaurantTemplate();
        } else {
            restaurantListElement.append(...restaurantItem);
        }

        document.getElementById('favContent').dispatchEvent(new Event('restaurants:updated'));
    }

    _getEmptyRestaurantTemplate() {
        return /*html*/ `
            <p class="text-for-empty">Tidak ada restoran yang ditampilkan</p>
        `;
    }
}

export default RestaurantSearchView;
