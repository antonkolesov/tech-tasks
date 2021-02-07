import Core from 'core';
import Types from 'types';
import Grid from 'component/grid';
import TaskCard from 'component/task-card';
import MediaQuery from 'component/media-query';
import './task-grid-view.scss';

export default class TaskGridView extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'selected',
            'onSelectionChange',
            'onPageChange',
            'onTasksUpdate'
        ]
    }, {
        group: 'card',
        include: 'onTasksUpdate'
    })
    @Core.types({
        selected: Types.arrayOf(Types.number),
        onSelectionChange: Types.func,
        onPageChange: Types.func,
        onTasksUpdate: Types.func
    })
    renderComponent() {
        return (
            <MediaQuery
                onResize={this.handleResize}>
                {this.renderChildren}
            </MediaQuery>
        );
    }

    @Core.bind()
    renderChildren(media) {
        let {mode} = media;

        if (mode === null) {
            return (
                <div {...media}
                    prefix="task-grid-view"/>
            );
        }

        return (
            <Grid {...this.rest} {...media}
                prefix="task-grid-view"
                infinite={true}
                columnCount={mode}
                renderCell={this.renderCell}
                onPageChange={this.handlePageChange}/>
        );
    }

    @Core.bind()
    renderCell(task) {
        let selected = !!this.own.selected.includes(task.key);
        
        return (
            <TaskCard {...this.card}
                showState
                prefix="task-grid-view__card"
                task={task}
                selected={selected}
                onSelectionChange={this.handleSelectionChange}/>
        );
    }

    @Core.bind()
    handleResize(event) {
        let {clientWidth} = event,
            mode = Math.floor(clientWidth / 380);

        if (!mode) {
            mode += 1;
        }

        return mode;
    }

    @Core.bind()
    handleSelectionChange(event) {
        let {selected} = this.own,
            {key, value} = event;

        if (value) {
            selected = selected.concat([key]);
        } else {
            selected = selected.filter(i => i !== key);
        }

        this.fire('onSelectionChange', {selected});
    }

    @Core.bind()
    handlePageChange({page}) {
        this.fire('onPageChange', {
            type: 'grid',
            page
        });
    }
}