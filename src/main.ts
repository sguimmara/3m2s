import Map from "ol/Map.js";
import View from "ol/View.js";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";

import { hideCard, showCard } from "./card";
import { loadFeatures, loadBasemaps } from "./layers";
import { highlight, select } from "./states";
import { initSearch, setFeaturedCategories } from "./search";
import { goTo, initNavigation } from "./navigation";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";

let orderedFeatures: Feature[];

const startDay1Btn = document.getElementById("start-d1");

if (!startDay1Btn) {
    throw new Error("missing element: start-d1");
}

const map = new Map({
    layers: loadBasemaps(),
    target: "map",
    controls: [],
    view: new View({
        projection: "EPSG:3857",
        center: fromLonLat([139.34, 38.822]),
        zoom: 5.5,
        minZoom: 5.5,
        maxZoom: 16,
        enableRotation: false,
    }),
});

let featureLayer: VectorLayer<VectorSource<Geometry>>;

loadFeatures("/data/features.geojson").then((layer) => {
    map.addLayer(layer);
    featureLayer = layer;
    const source = layer.getSource();
    if (!source) {
        throw new Error("no source on layer");
    }
    orderedFeatures = source.getFeatures();
    orderedFeatures.sort((a, b) => a.get("day") - b.get("day"));

    startDay1Btn.onclick = function () {
        selectFeature(orderedFeatures[0]);
    };

    initSearch(orderedFeatures);

    setFeaturedCategories([
        "nourriture",
        "voyage",
        "quotidien",
        "culture",
        "sortie",
        "balade",
        "anecdote",
    ]);

    initNavigation(map);
});

map.on("pointermove", (evt) => {
    if (!featureLayer) {
        return;
    }
    highlight(orderedFeatures, false);
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const f = picked[0] as Feature<Geometry>;
        document.body.style.cursor = "pointer";
        highlight(f, true);
    } else {
        document.body.style.cursor = "auto";
    }
});

function selectFeature(feature: Feature) {
    select(orderedFeatures, false);
    select(feature, true);

    setTimeout(() => goTo(feature), 5);

    const index = orderedFeatures.indexOf(feature);
    const previous = index > 0 ? orderedFeatures[index - 1] : undefined;
    const next =
        index < orderedFeatures.length - 1 ? orderedFeatures[index + 1] : undefined;

    const onNext = next
        ? function () {
            selectFeature(next);
        }
        : undefined;
    const onPrevious = previous
        ? function () {
            selectFeature(previous);
        }
        : undefined;

    showCard({
        title: `jour ${feature.get("day")}`,
        url: feature.get("url"),
        date: feature.get("date"),
        tags: feature.get("categories"),
        description: feature.get("description"),
        thumbnailUrl: feature.get("thumbnailUrl"),
        onNext,
        onPrevious,
    });
}

map.on("click", (evt) => {
    if (!featureLayer) {
        return;
    }

    hideCard();
    select(orderedFeatures, false);

    const picked = map.getFeaturesAtPixel(evt.pixel);

    if (picked.length > 0) {
        const selected = picked[0] as Feature;
        selectFeature(selected);
    }
});
