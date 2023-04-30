import Map from 'ol/Map.js';
import { fromLonLat } from 'ol/proj';

/** @type {HTMLButtonElement} */
let btnZoomIn = document.getElementById('btn-zoom-in');
/** @type {HTMLButtonElement} */
let btnZoomOut = document.getElementById('btn-zoom-out');
/** @type {HTMLButtonElement} */
let btnHome = document.getElementById('btn-home');

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
    const view = map.getView();

    btnZoomIn.onclick = () => zoomIn(map);
    btnZoomOut.onclick = () => zoomOut(map);
    btnHome.onclick = () => resetView(map);
}

export {
    initNavigation,
}