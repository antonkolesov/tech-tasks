import Core from 'core';
import Tools from 'reducer/tools';
import ToolPopup from 'component/tool-popup';

export default Core.connect(
    (state, props) => {
        let {all, sort} = state.tools,
            task = state.tasks.all.find(i => i.key === props.taskKey),
            dataKey = task.attachments.tools,
            data = all[dataKey];

        return {
            sort,
            task,
            dataKey,
            data,
            onLoad: Tools.readTools,
            onSortChange: Tools.setSort
        };
    },
    ToolPopup
);