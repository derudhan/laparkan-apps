import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="like-container"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('should show the unlike button when the restaurant has been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });

    it('should not show the like button when the restaurant has been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });

    it('should be able to unlike the resturant', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        document.getElementById('add-to-favorite').dispatchEvent(new Event('click'));

        const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
        expect(restaurant).toEqual([]);
    });

    it('should not throw error when user click unlike button if the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        await FavoriteRestaurantIdb.deleteRestaurant(1);

        document.getElementById('add-to-favorite').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});
