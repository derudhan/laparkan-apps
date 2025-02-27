import { Workbox } from 'workbox-window';

const swRegister = async () => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker is not supported');
        return;
    }

    const wb = new Workbox('./sw.bundle.js');

    try {
        await wb.register();
        console.log('Service worker registered');
    } catch (error) {
        console.error('Failed to register service worker:', error);
    }
};

export default swRegister;
