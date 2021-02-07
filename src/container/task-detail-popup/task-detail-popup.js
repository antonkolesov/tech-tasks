import Core from 'core';
import App from 'reducer/app';
import Tasks from 'reducer/tasks';
import Operations from 'reducer/operations';
import Materials from 'reducer/materials';
import Tools from 'reducer/tools';
import TaskDetailPopup from 'component/task-detail-popup';

export default Core.connect(
    (state, props) => {
        let {activeAttachment} = state.app,
            task = state.tasks.all.find(i => i.key === props.taskKey),
            dataKey = task.attachments[activeAttachment],
            data = state[activeAttachment].all[dataKey],
            opt = {};

        switch (activeAttachment) {
            case 'operations':
                opt.onLoad = Operations.readOperations;
                break;
            case 'materials':
                opt.sort = state.materials.sort;
                opt.onLoad = Materials.readMaterials;
                opt.onSortChange = Materials.setSort;
                break;
            case 'tools':
                opt.sort = state.tools.sort;
                opt.onLoad = Tools.readTools;
                opt.onSortChange = Tools.setSort;
                break;
        }

        return Object.assign({
            activeAttachment,
            data,
            dataKey,
            task,
            onTasksUpdate: Tasks.updateTasks,
            onActiveAttachmentChange: App.setActiveAttachment
        }, opt);
    },
    TaskDetailPopup
);