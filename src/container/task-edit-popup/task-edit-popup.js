import Core from 'core';
import Tasks from 'reducer/tasks';
import App from 'reducer/app';
import TaskEditPopup from 'component/task-edit-popup';

export default Core.connect(
    state => {
        let {all, selected} = state.tasks,
            {editConfirm: confirm} = state.app,
            tasks = all.filter(i => selected.includes(i.key));

        return {
            confirm,
            tasks,
            onSubmit: Tasks.updateTasks,
            onConfirmChange: App.setEditConfirm
        };
    },
    TaskEditPopup
);