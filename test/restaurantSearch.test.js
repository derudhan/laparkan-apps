import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import RestaurantSearchPresenter from '../src/scripts/utils/restaurant-search-presenter';
import RestaurantSearchView from '../src/scripts/utils/search-view';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const createSearchRestaurantContainer = () => {
        view = new RestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = {
            searchRestaurants: jest.fn(),
            getAllRestaurants: jest.fn(),
        };
        presenter = new RestaurantSearchPresenter({
            favoriteRestaurants,
            view,
        });
    };

    const searchQuery = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    beforeEach(() => {
        createSearchRestaurantContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
            searchQuery('restoran a');

            expect(presenter.latestQuery).toEqual('restoran a');
        });

        it('should ask the model to search for restaurant', () => {
            favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
            searchQuery('restoran a');

            expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restoran a');
        });

        it('should show the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('restaurant-item').length).toEqual(3);
                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [
                        { id: 111, name: 'restoran abc' },
                        { id: 222, name: 'ada juga restoran abcde' },
                        { id: 333, name: 'ini juga boleh restoran a' },
                    ];
                }
                return [];
            });

            searchQuery('restoran a');
        });

        it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                const restaurantNames = document.querySelectorAll('restaurant-item');

                expect(restaurantNames.item(0).restaurant.name).toEqual('restoran abc');
                expect(restaurantNames.item(1).restaurant.name).toEqual('ada juga restoran abcde');
                expect(restaurantNames.item(2).restaurant.name).toEqual('ini juga boleh restoran a');
                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [
                        { id: 111, name: 'restoran abc' },
                        { id: 222, name: 'ada juga restoran abcde' },
                        { id: 333, name: 'ini juga boleh restoran a' },
                    ];
                }
                return [];
            });

            searchQuery('restoran a');
        });

        it('should show - when the restaurant returned does not contain a name', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                const restaurantNames = document.querySelectorAll('restaurant-item');
                expect(restaurantNames.item(0).restaurant.name).toEqual('-');

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [{ id: 444, name: '-' }];
                }

                return [];
            });

            searchQuery('restoran a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

            searchQuery(' ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchQuery('    ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchQuery('');
            expect(presenter.latestQuery.length).toEqual(0);
            searchQuery('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
            searchQuery('    ');
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurants could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.text-for-empty').length).toEqual(1);
                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
            searchQuery('restoran a');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant').length).toEqual(0);
                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
            searchQuery('restoran a');
        });
    });
});
