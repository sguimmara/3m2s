import { Feature } from "ol";
import { hide } from "./states";
import _ from "lodash";

const activeCategories = new Set();

/**
 * @type {Array<Feature>}
 */
let searchedFeatures;

/**
 * @type {string}
 */
let searchQuery = '';

function toggleFilterCategory(category) {
    let result;
    if (activeCategories.has(category)) {
        activeCategories.delete(category);
        result = false;
    } else {
        activeCategories.add(category);
        result = true;
    }

    updateFeatures();

    return result
}

function setFeaturedCategories(categories) {
    const listElement = document.getElementById('search-category-list');

    for (const cat of categories) {
        // <span class="categorie café">café</span>
        const elt = document.createElement('button');
        elt.classList = 'toggle category ' + cat;
        elt.innerText = cat;
        elt.onclick = function () {
            const active = toggleFilterCategory(cat);
            if (active) {
                elt.classList.remove('category-inactive');
            } else {
                elt.classList.add('category-inactive');
            }
        }

        listElement.appendChild(elt);

        activeCategories.add(cat);
    }
}

function matchesKeywords(feature, keywords) {
    const tags = feature.get('categories');
    if (tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))) {
        return true;
    }

    return false;
}

/**
 * @param {Array<Feature>} features
 */
function setSearchedFeatures(features) {
    searchedFeatures = features;
}

/**
 * @param {string} query
 */
function setSearchQuery(query) {
    searchQuery = query;

    updateFeatures();
}

function updateFeatures() {
    const queriedVisible = getFilteredFeatureFromQuery();
    const categoryVisible = getFilteredFeatureFromCategories();

    const intersection = _.intersection(queriedVisible, categoryVisible);

    hide(searchedFeatures, true);

    for (const f of intersection) {
        hide(f, false);
    }
}

/**
 * @returns {Array<Feature>}
 */
function getFilteredFeatureFromCategories() {
    if (activeCategories.size === 0) {
        return [];
    }

    /**
     * @param {Feature} feature
     */
    function matchesCategories(feature) {
        const featureCategories = feature.get('categories');
        for (const cat of featureCategories) {
            if (activeCategories.has(cat)) {
                return true;
            }
        }

        return false;
    }

    return searchedFeatures.filter(f => matchesCategories(f));
}

/**
 * @returns {Array<Feature>}
 */
function getFilteredFeatureFromQuery() {
    if (searchQuery === '') {
        return [...searchedFeatures];
    } else {
        const keywords = searchQuery
            .split(',')
            .map(w => w.trim())
            .map(s => s.toLowerCase());

        return searchedFeatures.filter(f => matchesKeywords(f, keywords));
    }
}

export {
    setSearchedFeatures,
    setSearchQuery,
    setFeaturedCategories,
}