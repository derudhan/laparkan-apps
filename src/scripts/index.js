import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './utils/lucide-icons';
import App from './views/app';
import swRegister from './utils/sw-register';

// Components
import '../components/header-navbar';
import '../components/home-hero';
import '../components/loading-spinner';
import '../components/card-skeleton';
import '../components/page-detail';
import '../components/restaurant-list/restaurant-list';
import '../components/restaurant-list/restaurant-item';
import '../components/reviews-list/reviews-list';
import '../components/reviews-list/review-item';
import '../components/reviews-list/review-form';

const app = new App({
    mainContent: document.getElementById('main-content'),
    skipToContentButton: document.getElementById('skip-to-content'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});
