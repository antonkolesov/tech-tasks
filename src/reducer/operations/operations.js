import Core from 'core';
import Data from 'data';

export default class Operations {

    static prefix() {
        return 'Operations';
    }

    static defaults() {
        return {
            all: {}
        }
    }

    @Core.async()
    static readOperations({dataKey}) {
        Operations.setOperations({
            dataKey,
            operations: Core.loading
        });

        Data.fetch('Operations:read', dataKey).then(
            operations => Operations.setOperations({
                dataKey,
                operations
            })
        );
    }

    @Core.dispatch()
    static setOperations({state, dataKey, operations}) {
        return state.setIn(['operations', 'all', dataKey], operations);
    }
}