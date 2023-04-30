import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';

import VectorLayer from 'ol/layer/Vector';

import { hideCard, showCard } from './card';
import { loadFeatures, loadBasemaps } from './layers';
import { highlight, select } from './states';
import { initSearch, setFeaturedCategories } from './search';
import { goTo, initNavigation } from './navigation';

const baseLayers = loadBasemaps();

const map = new Map({
    layers: baseLayers,
    target: 'map',
    controls: [],
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

loadFeatures('/data/features.geojson').then(layer => {
    map.addLayer(layer);
    featureLayer = layer;
    const allFeatures = layer.getSource().getFeatures();

    initSearch(allFeatures);

    setFeaturedCategories(['nourriture', 'voyage', 'quotidien','culture', 'sortie','balade','anecdote']);

    initNavigation(map);
});

map.on('pointermove', (evt) => {
    if  (!featureLayer) {
        return;
    }
    const features = featureLayer.getSource().getFeatures();
    highlight(features, false);
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const f = picked[0];

        highlight(f, true);
    }
});

map.on('click', (evt) => {
    if  (!featureLayer) {
        return;
    }

    hideCard();

    const features = featureLayer.getSource().getFeatures();
    select(features, false);
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const selected = picked[0];
        select(selected, true);

        setTimeout(() => goTo(selected), 5);

        showCard({
            title: `jour ${selected.get('day')}`,
            url: selected.get('url'),
            date: selected.get('date'),
            tags: selected.get('categories'),
            description: selected.get('description'),
            thumbnailUrl: selected.get('thumbnailUrl')
        });
    }
});
