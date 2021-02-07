import Core from 'core';
import Materials from 'reducer/materials';
import MaterialPopup from 'component/material-popup';

export default Core.connect(
    (state, props) => {
        let {all, sort} = state.materials,
            task = state.tasks.all.find(i => i.key === props.taskKey),
            dataKey = task.attachments.materials,
            data = all[dataKey];

        return {
            task,
            dataKey,
            data,
            sort,
            onLoad: Materials.readMaterials,
            onSortChange: Materials.setSort
        };
    },
    MaterialPopup
);