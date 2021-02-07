import Component from 'component';
import TaskViewSwitcher from './task-view-switcher';
import 'index.scss';

class TaskViewSwitcherDemo extends Component {

    renderComponent() {
        return <>
            <TaskViewSwitcher/>
        </>
    }
}

Component.render(
    <TaskViewSwitcherDemo/>
);