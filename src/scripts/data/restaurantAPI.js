const BASE_URL = 'https://restaurant-api.dicoding.dev';
const API_ENDPOINT = {
    LIST: `${BASE_URL}/list`,
    DETAIL: (id) => `${BASE_URL}/detail/${id}`,
    SEARCH: (query) => `${BASE_URL}/search?q=${query}`,
    REVIEW: `${BASE_URL}/review`,
    IMAGE: (pictureId, resolution = 'large') => `${BASE_URL}/images/${resolution}/${pictureId}`,
};

class RestaurantAPI {
    static async getList() {
        return fetch(`${API_ENDPOINT.LIST}`)
            .then((response) => {
                return _responseHandler(response);
            })
            .catch((error) => {
                _handleError();
                return Promise.reject(error);
            });
    }

    static async getDetail(id) {
        return fetch(`${API_ENDPOINT.DETAIL(id)}`)
            .then((response) => {
                return _responseHandler(response);
            })
            .catch((error) => {
                _handleError();
                return Promise.reject(error);
            });
    }

    static async search(query) {
        return fetch(`${API_ENDPOINT.SEARCH(query)}`)
            .then((response) => {
                return _responseHandler(response);
            })
            .catch((error) => {
                _handleError();
                return Promise.reject(error);
            });
    }

    static async addReview(review) {
        return fetch(`${API_ENDPOINT.REVIEW}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then((response) => {
                return _responseHandler(response);
            })
            .catch((error) => {
                _handleError();
                return Promise.reject(error);
            });
    }

    static getImage(pictureId, resolution = 'large') {
        return `${API_ENDPOINT.IMAGE(pictureId, resolution)}`;
    }
}

async function _responseHandler(response) {
    if (!(response.status >= 200 && response.status < 300)) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response.json();
}

async function _handleError() {
    import('sweetalert2').then((Swal) => {
        Swal.default
            .fire({
                icon: 'error',
                title: 'Aduh...',
                text: 'Terjadi kesalahan saat memuat data',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Coba lagi',
                denyButtonText: 'Kembali',
                cancelButtonText: 'Tutup',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                } else if (result.isDenied) {
                    window.history.back();
                }
            });
    });
}

/* eslint-disable no-unused-vars */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/* eslint-enable no-unused-vars */

export default RestaurantAPI;
