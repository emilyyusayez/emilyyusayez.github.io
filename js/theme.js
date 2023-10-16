/**
 * Themes management
 */

(function () {
    const mainContainer = document.querySelector("html");

    const themes = [
        "theme-light",
        "theme-dark"
    ];

    const cookName = "esayez-portfolio-theme";

    // SET THEME LIGHT AND DARK
    setTheme();

    // SETS THEME TOGGLE BUTTON
    document.querySelector(".js-theme").addEventListener(
        "click",
        function(event) {
            event.preventDefault();
            toggleTheme(themes, mainContainer);
        }
    );


    // SETS THEME REINIT BUTTON
    document.querySelector(".js-remove-theme").addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            reinitTheme(themes, mainContainer);
        }
    );

    function toggleTheme(themes, mainContainer) {
        let hasChanged = false;

        for (let i = 0; i < themes.length; i++) {
            if (!hasChanged && (localStorage.getItem(cookName) == themes[i])) {
                mainContainer.classList.remove(themes[i]);
                if (i == (themes.length - 1)) var j = 0;
                else var j = i + 1;
                localStorage.setItem(cookName, themes[j]);
                mainContainer.classList.add(themes[j]);

                hasChanged = true;
            } 
        }

        // if preferences werent set before, will always go there
        if (!hasChanged) {

            // checks prefered color scheme
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                mainContainer.classList.add(themes[0]);
                localStorage.setItem(cookName, themes[0]);
            } else {
                mainContainer.classList.add(themes[1]);
                localStorage.setItem(cookName, themes[1]);
            }
        }
    }

    function reinitTheme(themes, mainContainer) {
        localStorage.removeItem(cookName);
        // mainContainer.classList.remove();
        
        for (theme of themes) mainContainer.classList.remove(theme);
    }

    function setTheme() {
        for (theme of themes) {
            if (localStorage.getItem(cookName) == theme)
                mainContainer.classList.add(theme);
            else
                mainContainer.classList.remove(theme);
        }
    }
})();