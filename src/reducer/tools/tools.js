import Core from 'core';
import Data from 'data';

export default class Tools {

    static prefix() {
        return 'Tools';
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
    static readTools({dataKey}) {
        Tools.setTools({
            dataKey,
            tools: Core.loading
        });

        Data.fetch('Tools:read', dataKey).then(
            tools => Tools.setTools({
                dataKey,
                tools
            })
        );
    }

    @Core.dispatch()
    static setTools({state, dataKey, tools}) {
        return state.setIn(['tools', 'all', dataKey], tools);
    }

    @Core.dispatch()
    static setSort({state, values}) {
        return state.setIn(['tools', 'sort'], values);
    }
}