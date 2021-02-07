import Core from 'core';
import TaskPage from './task-page';
import 'index.scss';

class TaskPageDemo extends Core.Component {

    renderComponent() {
        return <>
            <TaskPage/>
        </>
    }
}

Core.render(
    <TaskPageDemo/>
);