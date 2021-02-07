import Core from 'core';
import TaskHeader from './task-header';
import 'index.scss';

class TaskHeaderDemo extends Core.Component {

    renderComponent() {
        return <>
            <TaskHeader
                range="month"/>
        </>
    }
}

Core.render(
    <TaskHeaderDemo/>
);