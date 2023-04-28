import _ from 'lodash';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { easeOut } from 'ol/easing.js';
import { fromLonLat } from 'ol/proj';

import VectorLayer from 'ol/layer/Vector';

import { hideCard, showCard } from './card';
import { loadGeoJSON, loadBasemaps } from './layers';

const baseLayers = loadBasemaps();

const map = new Map({
    layers: baseLayers,
    target: 'map',
    view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([139.340, 38.822]),
        zoom: 5.5,
        minZoom: 5.5,
        enableRotation: false,
    }),
});

/**
 * @type {VectorLayer}
 */
let featureLayer;

loadGeoJSON('/data/features.geojson').then(features => {
    map.addLayer(features);
    featureLayer = features;
});
// loadCities('/cities.geojson')
//     .then(features => {
//         map.addLayer(features);
//     });

map.on('pointermove', (evt) => {
    if  (!featureLayer) {
        return;
    }
    const features = featureLayer.getSource().getFeatures();
    features.forEach(f => f.set('state', 'default'));
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const f = picked[0];
        f.set('state', 'hover');
    }
});

function goTo(feature) {
    const currentZoom = map.getView().getZoom();
    map.getView().animate({
        center: feature.getGeometry().getFirstCoordinate(),
        duration: 1000,
        easing: easeOut,
        zoom: currentZoom < 10 ? 10 : undefined,
    });
}

map.on('click', (evt) => {
    if  (!featureLayer) {
        return;
    }

    hideCard();

    const features = featureLayer.getSource().getFeatures();
    features.forEach(f => f.set('state', 'default'));
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const selected = picked[0];
        selected.set('state', 'selected');

        setTimeout(() => goTo(selected), 5);

        showCard({
            title: `jour ${selected.get('day')}`,
            url: selected.get('url'),
            date: selected.get('date'),
            tags: selected.get('categories'),
        });
    }
});

window.search = function (params) {
    // normal.getSource().clear();

    // if (params === "") {
    //     filteredFeatures = [...features];
    //     resetFeatures();
    //     return;
    // }

    // const keywords = params
    //     .split(',')
    //     .map(w => w.trim())
    //     .map(s => s.toLowerCase());

    // filteredFeatures.length = 0;

    // function test(feature) {
    //     const name = feature.get('name').toLowerCase();
    //     if (keywords.some(kw => name.includes(kw))) {
    //         return true;
    //     }

    //     const tags = feature.get('tags');
    //     if (tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))) {
    //         return true;
    //     }

    //     return false;
    // }

    // for (const feature of features) {
    //     if (feature && test(feature)) {
    //         filteredFeatures.push(feature);
    //     }
    // }

    // resetFeatures();
}

function addDate(num) {
    if (num < 0) {
        return;
    }

    if (num >= features.length) {
        return;
    }

    const f = features[num];
    if (f) {
        source.addFeature(f);
    }
}

window.setDate = function (txt) {
    // source.clear();

    // const date = Number.parseInt(txt);
    // addDate(date - 1);
    // addDate(date);
    // addDate(date + 1);
}
