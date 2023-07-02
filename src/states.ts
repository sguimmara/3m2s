import { Feature } from "ol"
import { FeatureLike } from "ol/Feature";

type States = 'default' | 'hover' | 'selected' | 'hidden' | 'category';

function map(features: Feature[] | Feature, fn: (f: Feature) => void) {
    if (Array.isArray(features)) {
        features.forEach(x => fn(x));
    } else {
        fn(features);
    }
}
function getStates(feature: FeatureLike): Set<States> {
    return feature.get('state') as Set<States>;
}

function select(features: Feature[] | Feature, selected: boolean) {
    map(features, (feature: Feature) => {
        const current = getStates(feature);
        if (selected) {
            current.add('selected');
        } else {
            current.delete('selected');
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

function highlight(features: Feature[] | Feature, highlighted: boolean) {
    map(features, (feature: Feature) => {
        const current = getStates(feature);
        if (!highlighted) {
            current.delete('hover');
        } else {
            current.add('hover');
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

function hide(features: Feature[] | Feature, hidden: boolean) {
    map(features, (feature: Feature) => {
        const current = getStates(feature);
        if (hidden) {
            current.add('hidden');
        } else {
            current.delete('hidden');
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

function toggleCategory(features: any, enable: boolean) {
    map(features, (feature: Feature) => {
        const current = getStates(feature);
        if (enable) {
            current.add('category');
        } else {
            current.delete('category');
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

export {
    highlight,
    select,
    hide,
    toggleCategory,
    States,
    getStates
}
