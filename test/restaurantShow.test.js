import RestaurantSearchView from '../src/scripts/utils/search-view';
import RestaurantShowPresenter from '../src/scripts/utils/restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new RestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => []),
            };

            new RestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });

            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.text-for-empty').length).toEqual(1);
                done();
            });

            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => []),
            };

            new RestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });

    describe('When favorite restaurants exist', () => {
        it('should show the restaurants', (done) => {
            document.getElementById('favContent').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('restaurant-item').length).toEqual(2);
                done();
            });
            const favoriteRestaurants = {
                getAllRestaurants: jest.fn().mockImplementation(() => [
                    {
                        id: 11,
                        title: 'A',
                        vote_average: 3,
                        overview: 'Sebuah restoran A',
                    },
                    {
                        id: 22,
                        title: 'B',
                        vote_average: 4,
                        overview: 'Sebuah restoran B',
                    },
                ]),
            };
            new RestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});
