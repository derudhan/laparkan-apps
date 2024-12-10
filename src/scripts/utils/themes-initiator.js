const ThemeInitiator = {
    init(elements) {
        const theme = localStorage.getItem('theme');

        theme && document.body.classList.add(theme);

        const handleThemeToggle = () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
                document.body.removeAttribute('class');
            }
        };

        elements.forEach((element) => {
            element.addEventListener('click', handleThemeToggle);
        });

        const remover = () => {
            elements.forEach((element) => {
                element.removeEventListener('click', handleThemeToggle);
            });
        };

        return remover;
    },
};

export default ThemeInitiator;
