import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import RestaurantSearchView from '../../utils/search-view';
import RestaurantShowPresenter from '../../utils/restaurant-show-presenter';
import RestaurantSearchPresenter from '../../utils/restaurant-search-presenter';

const view = new RestaurantSearchView();

const Favorite = {
    async render() {
        return view.getTemplate('Favorit Kamu');
    },

    async afterRender() {
        new RestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
        new RestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    },
};

export default Favorite;
