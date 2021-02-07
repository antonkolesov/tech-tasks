import Core from 'core';
import Operations from 'reducer/operations';
import OperationPopup from 'component/operation-popup';

export default Core.connect(
    (state, props) => {
        let task = state.tasks.all.find(i => i.key === props.taskKey),
            dataKey = task.attachments.operations,
            data = state.operations.all[dataKey];

        return {
            task,
            dataKey,
            data,
            onLoad: Operations.readOperations
        };
    },
    OperationPopup
);