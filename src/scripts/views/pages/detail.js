import RestaurantAPI from '../../data/restaurantAPI';
import urlParser from '../../routes/url-parser';

const Detail = {
    async render() {
        return /*html*/ `
            <div id="content" class="content section-lower container">
                <h1>Error 404; Halaman tidak ditemukan :(</h1>
            </div>
        `;
    },

    async afterRender() {
        window.scrollTo(0, 0);
        const url = urlParser.parseActiveUrlIwithoutCombiner();
        const contentContainer = document.getElementById('content');
        contentContainer.innerHTML = '<loading-spinner></loading-spinner>';

        try {
            const data = await RestaurantAPI.getDetail(url.id);

            const restaurant = data.restaurant;
            contentContainer.innerHTML = '';
            await this.renderDetail(contentContainer, restaurant);
            await this.renderButton(contentContainer);
            await this.renderReview(contentContainer, restaurant.customerReviews);
            await this.renderForm(contentContainer);
        } catch (error) {
            contentContainer.innerHTML = `<h1>Terjadi Kesalahan</h1><p>${error}</p>`;
        }
    },

    async renderDetail(element, data) {
        const detail = document.createElement('page-detail');
        detail.restaurant = data;
        element.appendChild(detail);
    },

    async renderButton(element) {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'button section';
        buttonElement.role = 'button';
        buttonElement.innerText = 'Kembali';
        buttonElement.addEventListener('click', () => {
            window.history.back();
        });
        element.appendChild(buttonElement);
    },

    async renderReview(element, data) {
        const reviewsContainer = document.createElement('reviews-list');
        reviewsContainer.innerHTML = '<loading-spinner class="text-for-empty" style="width: auto;"></loading-spinner>';
        element.appendChild(reviewsContainer);

        const reviews = data.map((review) => {
            const reviewCard = document.createElement('review-item');
            reviewCard.review = review;
            return reviewCard;
        });

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p class="text-for-empty">Belum ada review untuk restoran ini</p>';
            return reviewsContainer;
        }

        reviewsContainer.innerHTML = '';
        reviewsContainer.append(...reviews);
    },

    async renderForm(element) {
        const formElement = document.createElement('review-form');
        element.appendChild(formElement);
    },
};

export default Detail;
