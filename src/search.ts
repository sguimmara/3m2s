import { Feature } from "ol";
import { hide, toggleCategory } from "./states";
import _ from "lodash";

const activeCategories = new Set<string>();
const categoryToggles = new Map();
let featuredCategories: string[] = [];

const searchBar: HTMLInputElement = document.getElementById('search-bar') as HTMLInputElement;

let searchedFeatures: Array<Feature>;

let searchQuery: string = '';

let searchKeywords: string[] = [];

function toggleFilterCategory(category: string) {
    let result: boolean;
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

function setFeaturedCategories(categories: string[]) {
    const listElement = document.getElementById('search-category-list');
    const resetButton = document.getElementById('reset-categories');
    if (!listElement || !resetButton) {
        throw new Error('cannot find elements');
    }
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
        elt.className = "";
        elt.classList.add('toggle', 'category', cat);
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

function matchesKeywords(feature: Feature, keywords: Array<string>): boolean {
    const tags = feature.get('categories');
    if (tags.some((t: string) => keywords.some(kw => t.toLowerCase().includes(kw)))) {
        return true;
    }

    const day = `${feature.get('day')}`;
    if (keywords.some(kw => day === kw)) {
        return true;
    }

    /** @type {string} */
    const description: string = feature.get('description');

    if (keywords.some(kw => description.includes(kw))) {
        return true;
    }

    return false;
}

function initSearch(features: Array<Feature>) {
    searchBar.oninput = function () {
        setSearchQuery(searchBar.value);
    }

    searchedFeatures = features;
}

function setSearchQuery(query: string) {
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

function getFilteredFeatureFromCategories(): Array<Feature> {
    if (activeCategories.size === 0) {
        return [...searchedFeatures];
    }

    /**
     * @param {Feature} feature
     */
    function matchesCategories(feature: Feature) {
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

function getFilteredFeatureFromKeywords(): Array<Feature> {
    if (searchKeywords.length === 0) {
        return [...searchedFeatures];
    } else {
        return searchedFeatures.filter(f => matchesKeywords(f, searchKeywords));
    }
}

function addKeyword(keyword: string) {
    if (keyword) {
        if (searchKeywords.includes(keyword.trim())) {
            return;
        }
        searchKeywords.push(keyword.trim());
        searchBar.value = (searchBar.value.trim().length > 0 ? searchBar.value + ', ' : '') + keyword;
        updateFeatures();
    }
}

function setActiveCategory(category: string) {
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