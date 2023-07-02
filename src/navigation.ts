import Map from "ol/Map.js";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";

const btnHome: HTMLButtonElement = document.getElementById("btn-home") as HTMLButtonElement;

let currentMap: Map;

let blockHideCard = false;

const duration = 500;
const center = fromLonLat([139.34, 38.822]);

/**
 * @param {Map} map
 */
function resetView(map: Map) {
    const view = map.getView();
    view.animate({ zoom: view.getMinZoom(), center, duration });
}

/**
 * @param {Map} map
 */
function initNavigation(map: Map) {
    currentMap = map;
    const view = map.getView();

    btnHome.onclick = () => resetView(map);
    // view.on('change', () => {
    //     if (!blockHideCard) {
    //         hideCard();
    //     }
    // });
}

function isMoving() {
    return blockHideCard;
}

/**
 * @param {Feature} feature
 */
function goTo(feature: Feature) {
    blockHideCard = true;
    const view = currentMap.getView();
    const currentZoom = view.getZoom();
    if (!currentZoom) {
        return;
    }

    const geometry = feature.getGeometry() as Point;
    if (!geometry) {
        return;
    }
    const center = geometry.getFirstCoordinate();

    if (!center) {
        return;
    }

    view.animate(
        {
            center,
            // duration: 1000,
            // easing: easeOut,
            zoom: currentZoom < 10 ? 10 : undefined,
        },
        () => (blockHideCard = false)
    );
}

export { isMoving, initNavigation, goTo };
