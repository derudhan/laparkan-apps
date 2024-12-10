const DrawerInit = {
    init({ openMenuBtn, closeMenuBtn, drawer }) {
        let timer = null;

        const openMenuHandler = (event) => {
            event.stopPropagation();
            clearTimeout(timer);

            drawer.hidden = false;
            timer = setTimeout(() => (drawer.style.height = '100vh'), 30);
        };

        const closeMenuHandler = (event) => {
            event.stopPropagation();
            clearTimeout(timer);

            drawer.style.height = '0';
            timer = setTimeout(() => (drawer.hidden = true), 400);
        };

        openMenuBtn.addEventListener('click', openMenuHandler);
        closeMenuBtn.forEach((element) => element.addEventListener('click', closeMenuHandler));

        const removeEventListeners = () => {
            openMenuBtn.removeEventListener('click', openMenuHandler);
            closeMenuBtn.forEach((element) => element.removeEventListener('click', closeMenuHandler));
        };

        return removeEventListeners;
    },
};

export default DrawerInit;
