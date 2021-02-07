import Core from 'core';
import Tasks from 'reducer/tasks';
import App from 'reducer/app';
import TaskAddPopup from 'component/task-add-popup';

export default Core.connect(
    state => {
        let {addConfirm: confirm} = state.app;

        return {
            confirm,
            onSubmit: Tasks.createTasks,
            onConfirmChange: App.setAddConfirm
        };
    },
    TaskAddPopup
)