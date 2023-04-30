import Map from 'ol/Map.js';
import { fromLonLat } from 'ol/proj';
import { hideCard } from './card';
import { Feature } from 'ol';
import { easeOut } from 'ol/easing';

/** @type {HTMLButtonElement} */
let btnZoomIn = document.getElementById('btn-zoom-in');
/** @type {HTMLButtonElement} */
let btnZoomOut = document.getElementById('btn-zoom-out');
/** @type {HTMLButtonElement} */
let btnHome = document.getElementById('btn-home');

/** @type {Map} */
let currentMap;

let blockHideCard = false;

const duration = 500;
const center = fromLonLat([139.340, 38.822]);
const minZoom = 5.5;

/**
 * @param {Map} map
 */
function zoomIn(map) {
    const view = map.getView();
    view.animate({ zoom: view.getZoom() + 1, duration });
}

/**
 * @param {Map} map
 */
function zoomOut(map) {
    const view = map.getView();
    view.animate({ zoom: view.getZoom() - 1, duration });
}

/**
 * @param {Map} map
 */
function resetView(map) {
    const view = map.getView();
    view.animate({ zoom: minZoom, center, duration });
}

/**
 * @param {Map} map
 */
function initNavigation(map) {
    currentMap = map;
    const view = map.getView();

    btnZoomIn.onclick = () => zoomIn(map);
    btnZoomOut.onclick = () => zoomOut(map);
    btnHome.onclick = () => resetView(map);
    view.on('change', () => {
        if (!blockHideCard) {
            hideCard();
        }
    });
}

/**
 * @param {Feature} feature
 */
function goTo(feature) {
    blockHideCard = true;
    const view = currentMap.getView();
    const currentZoom = view.getZoom();

    view.animate({
        center: feature.getGeometry().getFirstCoordinate(),
        duration: 1000,
        easing: easeOut,
        zoom: currentZoom < 10 ? 10 : undefined,
    }, () => blockHideCard = false);
}

export {
    initNavigation,
    goTo,
}