import RestaurantAPI from '../../data/restaurantAPI';

const Home = {
    async render() {
        return /*html*/ `
            <home-hero></home-hero>
            <restaurant-list></restaurant-list>
        `;
    },

    async afterRender() {
        const restaurantList = document.body.querySelector('restaurant-list');
        restaurantList.innerHTML = '<card-skeleton></card-skeleton>'.repeat(20);

        try {
            const restaurants = await RestaurantAPI.getList();
            const restaurantsData = restaurants.restaurants;

            const restaurantItem = restaurantsData.map((restaurant) => {
                const card = document.createElement('restaurant-item');
                card.restaurant = restaurant;
                return card;
            });

            if (restaurantItem.length === 0) {
                restaurantList.innerHTML = '<p class="text-for-empty">Tidak ada restoran yang terdaftar di sini</p>';
                return;
            }

            restaurantList.innerHTML = '';
            restaurantList.append(...restaurantItem);
        } catch (error) {
            restaurantList.innerHTML = `<div class="text-for-empty"><h1>Terjadi Kesalahan</h1><p>${error}</p></div>`;
        }
    },
};

export default Home;
