import { Feature } from "ol";
import { hide, toggleCategory } from "./states";
import _ from "lodash";

const activeCategories = new Set();
const categoryToggles = new Map();
let featuredCategories = [];

/**
 * @type {HTMLInputElement}
 */
const searchBar = document.getElementById('search-bar');

/**
 * @type {Array<Feature>}
 */
let searchedFeatures;

/**
 * @type {string}
 */
let searchQuery = '';

let searchKeywords = [];

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
    const resetButton = document.getElementById('reset-categories');
    featuredCategories = categories;
    resetButton.onclick = function () {
        activeCategories.clear();
        searchKeywords = [];
        searchBar.value = '';

        for (const elt of categoryToggles.values()) {
            elt.classList.remove('category-active');
        }
        // const upClass = 'toggle-up';
        // const downClass = 'toggle-down';

        // if (resetButton.classList.contains(downClass)) {
        //     resetButton.classList.remove(downClass);
        //     resetButton.classList.add(upClass);
        // } else {
        //     resetButton.classList.add(downClass);
        //     resetButton.classList.remove(upClass);
        // }

        updateFeatures();
    }

    for (const cat of categories) {
        // <button class="categorie café">café</button>
        const elt = document.createElement('button');
        categoryToggles.set(cat, elt);
        elt.classList = 'toggle category ' + cat;
        elt.innerText = cat;
        elt.onclick = function () {
            const active = toggleFilterCategory(cat);
            if (active) {
                elt.classList.add('category-active');
            } else {
                elt.classList.remove('category-active');
            }
        }

        listElement.appendChild(elt);
    }
}

function getFeaturedCategories() {
    return featuredCategories;
}

/**
 *
 * @param {Feature} feature
 * @param {Array<string>} keywords
 * @returns {boolean}
 */
function matchesKeywords(feature, keywords) {
    const tags = feature.get('categories');
    if (tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))) {
        return true;
    }

    const day = `${feature.get('day')}`;
    if (keywords.some(kw => day === kw)) {
        return true;
    }

    /** @type {string} */
    const description = feature.get('description');

    if (keywords.some(kw => description.includes(kw))) {
        return true;
    }

    return false;
}

/**
 * @param {Array<Feature>} features
 */
function initSearch(features) {
    searchBar.oninput = function () {
        setSearchQuery(searchBar.value);
    }

    searchedFeatures = features;
}

/**
 * @param {string} query
 */
function setSearchQuery(query) {
    searchQuery = query;

    searchKeywords = searchQuery
        .split(',')
        .map(w => w.trim())
        .map(s => s.toLowerCase())
        .filter(s => s.length > 0);

    updateFeatures();
}

function updateFeatures() {
    const queriedVisible = getFilteredFeatureFromKeywords();
    const categoryVisible = getFilteredFeatureFromCategories();

    const intersection = _.intersection(queriedVisible, categoryVisible);

    hide(searchedFeatures, true);

    const enableCategory = activeCategories.size > 0;

    for (const f of intersection) {
        toggleCategory(f, enableCategory);
        hide(f, false);
    }
}

/**
 * @returns {Array<Feature>}
 */
function getFilteredFeatureFromCategories() {
    if (activeCategories.size === 0) {
        return [...searchedFeatures];
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
function getFilteredFeatureFromKeywords() {
    if (searchKeywords.length === 0) {
        return [...searchedFeatures];
    } else {
        return searchedFeatures.filter(f => matchesKeywords(f, searchKeywords));
    }
}

/**
 * @param {string} keyword
 */
function addKeyword(keyword) {
    if (keyword) {
        if (searchKeywords.includes(keyword.trim())) {
            return;
        }
        searchKeywords.push(keyword.trim());
        searchBar.value = (searchBar.value.trim().length > 0 ? searchBar.value + ', ' : '') + keyword;
        updateFeatures();
    }
}

function setActiveCategory(category) {
    [...categoryToggles.values()].forEach(elt => elt.classList.remove('category-active'));

    activeCategories.clear();
    activeCategories.add(category);
    categoryToggles.get(category).classList.add('category-active');
    updateFeatures();
}

function getActiveCategories() {
    return activeCategories;
}

export {
    getActiveCategories,
    setActiveCategory,
    getFeaturedCategories,
    initSearch,
    setSearchQuery,
    setFeaturedCategories,
    addKeyword,
}