import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Stamen from 'ol/source/Stamen.js';

import styles from './styles';
import { Feature } from "ol";
import { getVectorContext } from "ol/render";
import { Fill, Style } from "ol/style";

function loadBasemaps() {
    const transition = 16;

    const watercolor = new TileLayer({
        className: 'background',
        source: new Stamen({ layer: 'watercolor' }),
        maxZoom: transition,
    });

    const labels = new TileLayer({
        source: new Stamen({ layer: 'terrain-labels' }),
        maxZoom: transition,
    });

    const clipLayer = new VectorLayer({
        style: null,
        source: new VectorSource({
            url: '/data/mask.geojson',
            format: new GeoJSON(),
        }),
    });

    const style = new Style({
        fill: new Fill({
            color: 'black',
        }),
    });

    clipLayer.getSource().on('addfeature', function () {
        labels.setExtent(clipLayer.getSource().getExtent());
    });

    labels.on('postrender', function (e) {
        const vectorContext = getVectorContext(e);
        e.context.globalCompositeOperation = 'destination-in';
        clipLayer.getSource().forEachFeature(function (feature) {
            vectorContext.drawFeature(feature, style);
        });
        e.context.globalCompositeOperation = 'source-over';
    });

    const osm = new TileLayer({
        source: new OSM({
            url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        }),
        minZoom: transition,
    });

    return [watercolor, osm, labels, clipLayer];
}

/**
 * @param {Feature} feature
 */
function validate(feature) {
    if (typeof feature.get('url') !== 'string') {
        throw new Error('invalid property: "url" should be a string');
    }
    if (typeof feature.get('description') !== 'string') {
        throw new Error('invalid property: "description" should be a string');
    }
    if (typeof feature.get('day') !== 'number') {
        throw new Error('invalid property: "day" should be a number');
    }
    if (typeof feature.get('date') !== 'string') {
        throw new Error('invalid property: "date" should be a string');
    }
    if (typeof feature.get('thumbnailUrl') !== 'string') {
        throw new Error('invalid property: "thumbnailUrl" should be a string');
    }

    const categories = feature.get('categories');
    if (!Array.isArray(categories)) {
        throw new Error('invalid property: "category" should be an array');
    }
}

/**
 * Loads the features and returns the created layer.
 * @param {string} url The URL to the GeoJSON file.
 * @returns {VectorLayer} The created vector layer.
 */
async function loadFeatures(url, defaultState = 'default') {
    const res = await fetch(url);
    const json = await res.json();

    const format = new GeoJSON({
        featureProjection: 'EPSG:3857'
    });

    const features = format.readFeatures(json);

    features.forEach(f => {
        validate(f);
        f.set('state', defaultState)
    });

    const layer = new VectorLayer({
        source: new VectorSource({
            attributions: 'Morgane Hamon',
            features,
        }),
        style: f => styles[f.get('state')]
    });

    return layer;
}

export {
    loadFeatures,
    loadBasemaps,
}
