import Core from 'core';
import TaskAddPopup from './task-add-popup';
import 'index.scss';

class TaskAddPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <TaskAddPopup/>
        </>
    }
}

Core.render(
    <TaskAddPopupDemo/>
);