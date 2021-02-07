import Component from 'component';
import TaskEditPopup from './task-edit-popup';
import 'index.scss';

class TaskEditPopupDemo extends Component {

    renderComponent() {
        return <>
            <TaskEditPopup/>
        </>
    }
}

Component.render(
    <TaskEditPopupDemo/>
);