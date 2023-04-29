import { Feature } from "ol";
import { hide } from "./states";

function setFeaturedCategories(categories) {
    const listElement = document.getElementById('search-category-list');

    for (const cat of categories) {
        // <span class="categorie café">café</span>
        const elt = document.createElement('span');
        elt.classList = 'toggle category ' + cat;
        elt.innerText = cat;

        listElement.appendChild(elt);
    }
}

function matches(feature, keywords) {
    // const name = feature.get('name').toLowerCase();
    // if (keywords.some(kw => name.includes(kw))) {
    //     return true;
    // }

    const tags = feature.get('categories');
    if (tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))) {
        return true;
    }

    return false;
}

/**
 * @param {Array<Feature>} features
 * @param {string} query
 */
function executeSearch(features, query) {
    if (query === '') {
        hide(features, false);
    } else {
        const keywords = query
            .split(',')
            .map(w => w.trim())
            .map(s => s.toLowerCase());

        features.forEach(f => hide(f, !matches(f, keywords)));
    }
}

export {
    executeSearch,
    setFeaturedCategories,
}