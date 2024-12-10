const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorite restaurant', ({ I }) => {
    I.seeElement('#favContent');
    I.see('TIDAK ADA RESTORAN YANG DITAMPILKAN', '.text-for-empty');
});

Scenario('favoriting one restaurant', async ({ I }) => {
    I.see('TIDAK ADA RESTORAN YANG DITAMPILKAN', '.text-for-empty');

    I.amOnPage('/');

    I.seeElement('restaurant-item');
    const firstRestaurantName = await I.executeScript(() => {
        const shadowRoot = document.querySelector('restaurant-item').shadowRoot;
        shadowRoot.querySelector('.card-title').click();
        return shadowRoot.querySelector('.card-title').innerText;
    });

    I.seeElement('#add-to-favorite');
    I.click('#add-to-favorite');

    I.amOnPage('/#/favorite');
    I.seeElement('.card');

    const favoritedRestaurantTitle = await I.executeScript(() => {
        const shadowRoot = document.querySelector('restaurant-item').shadowRoot;
        shadowRoot.querySelector('.card-title').click();
        return shadowRoot.querySelector('.card-title').innerText;
    });
    assert.strictEqual(firstRestaurantName, favoritedRestaurantTitle);
});

Scenario('searching favorite restaurant', async ({ I }) => {
    I.see('TIDAK ADA RESTORAN YANG DITAMPILKAN', '.text-for-empty');

    I.amOnPage('/');

    I.seeElement('restaurant-item');

    const names = [];
    for (let i = 1; i <= 3; i++) {
        I.executeScript((i) => {
            const restaurantItems = document.querySelectorAll('restaurant-item');
            const shadowRoot = restaurantItems.item(i).shadowRoot;
            shadowRoot.querySelector('.card-title').click();
        }, i - 1);

        I.seeElement('#add-to-favorite');
        I.click('#add-to-favorite');

        names.push(
            await I.executeScript(() => {
                const shadowRoot = document.querySelector('page-detail').shadowRoot;
                return shadowRoot.querySelector('.head__title').innerText;
            })
        );

        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.seeElement('#query');

    const visibleFavoritedRestaurant = await I.grabNumberOfVisibleElements('restaurant-item');
    assert.strictEqual(names.length, visibleFavoritedRestaurant);

    const searchQuery = names[1].substring(1, 3);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const matchingRestaurant = names.filter((name) => name.indexOf(searchQuery) !== -1);
    const visibleSearchedFavoritedRestaurant = await I.grabNumberOfVisibleElements('restaurant-item');

    assert.strictEqual(matchingRestaurant.length, visibleSearchedFavoritedRestaurant);

    for (let i = 0; i < matchingRestaurant.length; i++) {
        const visibleName = await I.executeScript((i) => {
            const restaurantItems = document.querySelectorAll('restaurant-item');
            const shadowRoot = restaurantItems.item(i).shadowRoot;
            return shadowRoot.querySelector('.card-title').innerText;
        }, i);

        assert.strictEqual(matchingRestaurant[i].toLowerCase(), visibleName.toLowerCase());
    }
});
