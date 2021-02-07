import Core from 'core';
import TaskDetailPopup from './task-detail-popup';
import 'index.scss';

class TaskDetailPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <TaskDetailPopup/>
        </>
    }
}

Core.render(
    <TaskDetailPopupDemo/>
);