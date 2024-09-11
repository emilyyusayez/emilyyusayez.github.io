const mainContainer = document.querySelector("#js-container");
const filtergCheckbox = document.querySelectorAll(".js-optiong--checkbox");
const filtergRadio = document.querySelectorAll(".js-optiong--radio");
const deselectAll = document.querySelector(".js-deselect-all");
const selectAll = document.querySelector(".js-select-all");
const articles = document.querySelectorAll(".js-filter-article");
const buttonName = '.js-option';
const articlesContainer = document.querySelector("#js-container");


// FILTERS OBJECT used to filter by type
const filters = {
    toggle: function(...options) {
        for (opt of options) {
            try {
                if (this[opt]) this[opt] = false;
                else this[opt] = true;
                console.log(this[opt]);
            } catch (e) {}
        }
    },

    filterRGX: function(option) {
        return '^' + option + ' | ' + option + ' | ' + option + '$|^' + option + '$';
    }
};


// SORT OBJECT used to sort the articles given a specific type
const sort = {
    toggle: function(...options) {
        for (opt of options) {
            try {
                if (this[opt]) this[opt] = false;
                else this[opt] = true;
                console.log(this[opt]);
            } catch (e) {}
        }
    },

    type: false
};

// SETS FILTER AND SORT
(function() {
    
    // adds listener for click event on filter button
    filtergCheckbox.forEach(function(filterg) {
        filterg.querySelectorAll(buttonName).forEach(function(checkboxButton) {
            checkboxButton.addEventListener(
                "click",
                function (event) {
                    filterCheckboxTrigger(checkboxButton);
                    updateArticles();
                }
            );
        });
    });

    // adds listener for click event on sort button
    filtergRadio.forEach(function(filterg) {
        filterg.querySelectorAll(buttonName).forEach(function(checkboxButton) {
            checkboxButton.addEventListener(
                "click",
                function (event) {
                    filterRadioTrigger(checkboxButton, filterg);
                }
            );
        });
    });

    // sets filter deselect all events
    deselectAll.addEventListener(
        "click",
        function (event) {
            toggleAll(false);
        }
    )

    // set filter and sort events
    setFilters();


})();


// CLICK EVENT FOR FILTERS
function filterCheckboxTrigger(trigger, forceState) {
    let triggerCheck = filters[trigger.dataset.type];

    if (forceState == undefined) {
        trigger.classList.toggle("toggled");
        filters[trigger.dataset.type] = !triggerCheck;
    } else {
        if (forceState == true) {
            trigger.classList.add("toggled");
        } else {
            trigger.classList.remove("toggled");
        }
        filters[trigger.dataset.type] = forceState;
    }
}

// CLICK EVENT FOR SORT
function filterRadioTrigger(trigger, filterg) {

    // removes all toggled classes
    filterg.querySelectorAll(buttonName).forEach(
        function(radioButton) {
            radioButton.classList.remove("toggled");
    });

    // adds toggled class and updates sort dic
    trigger.classList.add("toggled");

    // updates article list
    sortArticles(trigger.dataset.type);
}


function setFilters() {
    // SETS FILTERS TO NOT SELECTED
    document.querySelectorAll('.js-filterg .js-option').forEach(
        (opt) => {
            filters[opt.dataset.type] = false;
            opt.classList.remove("toggled");
        }
    );

    // SETS SORTS TO THE DEFAULT MODE
    let c = 0;
    document.querySelectorAll('.js-sortg .js-option').forEach(
        (opt) => {
            if (opt.classList.contains("toggled")) {
                if (c == 0) {
                    sort.type = opt.dataset.type;
                    console.log("hello");
                    c ++;
                } else {
                    opt.classList.remove("toggled");
                }
            }
        }
    );

    let dfault = document.querySelector(".js-sortg .default");
    if (sort.type == false) {
        sort.type = dfault.dataset.type;
        dfault.classList.add("toggled");
    }

    sortArticles(sort.type);
}

function toggleAll(selected) {
    filtergCheckbox.forEach(function(filterg) {
        filterg.querySelectorAll(buttonName).forEach(function(checkboxButton) {
            filterCheckboxTrigger(checkboxButton, selected);
        });
    });

    updateArticles();
}

function updateArticles() {
    articles.forEach(
        (article) => {
            let articleFilters = article.dataset.filters;
            let rgx1 = /\b[a-z]+(?:['-]?[a-z]+)*\b/gm;

            let reg = '';
            let c = 0;
            for (filter in filters) {
                if ((typeof filter != 'function') && (filters[filter] == true)) {
                    if (c == 0) {
                        c ++;
                    }
                    else reg += '|';
                    reg += filters.filterRGX(filter);
                    
                }
            }

            
            let rgx = new RegExp(reg, 'gm');
            let matches = articleFilters.match(rgx);
            if (matches != null) {
                article.classList.remove('hidden');
            }
            else article.classList.add('hidden');
        }
    );
}


// SORTING FUNCTION
// given a specific type
function sortByType(sortType) {
    // all articles
    let articles = Array.from(document.querySelectorAll(".js-filter-article"));


    // choice of reverse state and type
    let reverse = 1;
    let type = 'alpha';

    switch (sortType) {
        case 'alpha':
            type = 'alpha';
            break;
        case 'alpha-reverse':
            type = 'alpha';
            reverse = -1;
            break;
        case 'date':
            type = 'date';
            break;
        case 'date-reverse':
            type = 'date';
            reverse = -1;
            break;
        case 'type':
            type = 'type';
            break;
        case 'type-reverse':
            type = 'type';
            reverse = -1;
            break;
    }

    // sort operation
    return articles.sort(function(a, b) {
        let an;
        let bn;

        switch (type) {

            // dataset name
            case 'alpha':
                an = a.dataset.name;
                bn = b.dataset.name;
                break;

            // dataset date
            case 'date':
                an = a.dataset.date;
                bn = b.dataset.date;
                break;
            
            // dataset type
            case 'type':
                an = a.dataset.filters;
                bn = b.dataset.filters;
                break;
        }

        // reverses the operation or not
        if (an > bn) return reverse * 1;
        else if (an < bn) return reverse * -1;
        else return 0;
    });
}


function sortArticles(sortType) {
    let sorted = sortByType(sortType);

    // updates article list
    articlesContainer.innerHTML = '';
    for (el of sorted) articlesContainer.append(el);
}