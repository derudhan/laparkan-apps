import { createElement } from 'lucide';

const createLucideIcon = (icon) => {
    const iconElement = createElement(icon);
    iconElement.classList.add('lucide');
    return iconElement;
};

export default createLucideIcon;
