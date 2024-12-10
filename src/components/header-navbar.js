import headerStyle from '!!css-loader!sass-loader!../styles/general/header-navbar.scss';
import DrawerInit from '../scripts/utils/drawer-initiator';
import ThemeInitiator from '../scripts/utils/themes-initiator';
import { ChefHat, SunMoon, Menu, CircleX } from 'lucide';
import createLucideIcon from '../scripts/utils/lucide-icons';

let drawerListenerRemover = null;
let themeListenerRemover = null;

class HeaderNavbar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
        this._template = document.createElement('template');

        this._class = this.getAttribute('class') || '';
    }

    static get observedAttributes() {
        return ['class'];
    }

    _updateIcons() {
        const icons = {
            chefHat: ChefHat,
            sunMoon: SunMoon,
            sunMoon2: SunMoon,
            menu: Menu,
            circleX: CircleX,
        };

        Object.keys(icons).forEach((id) => {
            const icon = createLucideIcon(icons[id]);
            this._shadowRoot.getElementById(id).replaceWith(icon);
        });
    }

    connectedCallback() {
        this._render();
        drawerListenerRemover = DrawerInit.init({
            openMenuBtn: this._shadowRoot.getElementById('openMenu'),
            closeMenuBtn: this._shadowRoot.querySelectorAll('#closeMenu'),
            drawer: this._shadowRoot.getElementById('app-nav-drawer'),
        });
        themeListenerRemover = ThemeInitiator.init(this._shadowRoot.querySelectorAll('#themeSwitcher'));
        this._updateIcons();
    }

    disconnectedCallback() {
        drawerListenerRemover();
        themeListenerRemover();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            this[`_${name}`] = newVal;
            this._render();
        }
    }

    _resetComponent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this.style = 'width: 100%;';
        this._style.innerHTML = headerStyle.toString();
    }

    _updateTemplate() {
        this._template.innerHTML = /*html*/ `
            <nav class="app-bar-container ${this._class}">
                <div class="app-bar container">
                    <a href="#/" class="app-brand">
                        <i id="chefHat" class="app-brand-icon"></i>
                        <p class="app-brand-name">Laparkan</p>
                    </a>
                    <ul class="app-nav">
                        <li class="links"><a href="#/">Home</a></li>
                        <li class="links"><a href="#/favorite">Favorite</a></li>
                        <li class="links"><a href="https://github.com/derudhan">About Us</a></li>
                        <li class="links"><button id="themeSwitcher" class="themeSwitcher" aria-label="Tombol pengganti mode terang/gelap"><i id="sunMoon"></i></button></li>
                    </ul>
            
                    <!-- Drawer untuk navigasi di mobile -->
                    <button id="openMenu" class="app-nav-menu" aria-label="Buka menu navigasi"><i id="menu"></i></button>
                    <div id="app-nav-drawer" class="app-nav-drawer" hidden>
                        <ul>
                            <li class="links"><a href="#/" id="closeMenu">Home</a></li>
                            <li class="links"><a href="#/favorite" id="closeMenu">Favorite</a></li>
                            <li class="links"><a href="https://github.com/derudhan" id="closeMenu">About Us</a></li>
                            <li class="links"><button id="themeSwitcher" class="themeSwitcher" aria-label="Tombol pengganti mode terang/gelap"><i id="sunMoon2"></i></button></li>
                        </ul>
                        <button id="closeMenu" class="closeBtn" aria-label="Tutup menu navigasi"><i id="circleX"></i></button>
                    </div>
                </div>
            </nav>
        `;
    }

    _render() {
        this._resetComponent();
        this._updateStyle();
        this._updateTemplate();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    }
}

customElements.define('header-navbar', HeaderNavbar);
