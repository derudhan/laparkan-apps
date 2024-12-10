const assert = require('assert');

Feature('Customer Review of Restaurant');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('Showing first reviewer from first restaurant', async ({ I }) => {
    I.seeElement('restaurant-item');
    I.executeScript(() => {
        const shadowRoot = document.querySelector('restaurant-item').shadowRoot;
        shadowRoot.querySelector('.card-title').click();
    });

    I.seeElement('review-item');
    const firstReviewerName = await I.executeScript(() => {
        const shadowRoot = document.querySelector('review-item').shadowRoot;
        return shadowRoot.querySelector('.review-name').innerText;
    });

    assert.strictEqual('Ahmad', firstReviewerName);
});

Scenario('Adding new review to first restaurant and check', async ({ I }) => {
    I.seeElement('restaurant-item');
    I.executeScript(() => {
        const shadowRoot = document.querySelector('restaurant-item').shadowRoot;
        shadowRoot.querySelector('.card-title').click();
    });

    I.seeElement('review-form');
    I.executeScript(() => {
        const shadowRoot = document.querySelector('review-form').shadowRoot;
        shadowRoot.querySelector('#username').value = 'Deru';
        shadowRoot.querySelector('#body').value = 'Sedang testing E2E';
        shadowRoot.querySelector('.button').click();
    });

    I.wait(2);

    I.seeElement('review-item');
    const newReviewerName = await I.executeScript(() => {
        const shadowRoot = document.querySelector('review-item').shadowRoot;
        const reviewNames = shadowRoot.querySelectorAll('.review-name');
        return reviewNames[reviewNames.length - 1].innerText;
    });

    assert.strictEqual('Deru', newReviewerName);
});
