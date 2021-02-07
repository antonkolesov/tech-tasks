import Core from 'core';
import BorderLayout from 'component/border-layout';
import TaskHeader from 'container/task-header';
import Sidebar from 'container/sidebar';
import TaskViewSwitcher from 'container/task-view-switcher';
import Messenger from 'container/messenger';
import './task-page.scss';

export default class TaskPage extends Core.Component {

    @Core.props({
        group: 'layout',
        include: 'collapsed'
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="task-page">
                <TaskHeader prefix="task-page__header"/>
                <BorderLayout {...this.layout}
                    prefix="task-page__body"
                    left={this.renderSidebar}
                    center={this.renderContent}
                    right={this.renderMessenger}/>
            </div>
        );
    }

    @Core.bind()
    renderSidebar() {
        return <Sidebar prefix="task-page__sidebar"/>;
    }

    @Core.bind()
    renderContent() {
        return <TaskViewSwitcher prefix="task-page__view-switcher"/>;
    }

    @Core.bind()
    renderMessenger() {
        return <Messenger prefix="task-page__messenger"/>;
    }
}