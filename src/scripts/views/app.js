import urlParser from '../routes/url-parser';
import routes from '../routes/routes';
// Components
import '../../components/header-navbar';
import '../../components/home-hero';
import '../../components/loading-spinner';
import '../../components/card-skeleton';
import '../../components/page-detail';
import '../../components/restaurant-list/restaurant-list';
import '../../components/restaurant-list/restaurant-item';
import '../../components/reviews-list/reviews-list';
import '../../components/reviews-list/review-item';
import '../../components/reviews-list/review-form';

class App {
    constructor({ mainContent, skipToContentButton }) {
        this._mainContent = mainContent;
        this._skipToContentButton = skipToContentButton;

        this._skipToContent();
    }

    _skipToContent() {
        this._skipToContentButton.addEventListener('click', (event) => {
            event.preventDefault();
            this._mainContent.focus();
        });
    }

    async renderPage() {
        const url = urlParser.parseActiveUrlIwithCombiner();
        const page = routes[url];
        this._mainContent.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;
