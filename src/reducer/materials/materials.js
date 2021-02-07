import Core from 'core';
import Data from 'data';

export default class Materials {

    static prefix() {
        return 'Materials';
    }

    static defaults() {
        return {
            all: {},
            sort: {
                sort: 'id',
                order: 'asc'
            }
        }
    }

    @Core.async()
    static readMaterials({dataKey}) {
        Materials.setMaterials({
            dataKey,
            materials: Core.loading
        });

        Data.fetch('Materials:read', dataKey).then(
            materials => Materials.setMaterials({
                dataKey,
                materials
            })
        );
    }

    @Core.dispatch()
    static setMaterials({state, dataKey, materials}) {
        return state.setIn(['materials', 'all', dataKey], materials);
    }

    @Core.dispatch()
    static setSort({state, values}) {
        return state.setIn(['materials', 'sort'], values);
    }
}