import Core from 'core';
import Types from 'types';
import TaskCard from 'component/task-card';
import Scroller from 'component/scroller';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import './task-column-view.scss';

let columns = [{
    key: 'todo',
    text: 'Выполнить'
}, {
    key: 'doing',
    text: 'Выполняется'
}, {
    key: 'done',
    text: 'Выполнено'
}]

export default class TaskColumnView extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'data',
            'pages',
            'selected',
            'onTasksUpdate',
            'onSelectionChange',
            'onPageChange'
        ]
    })
    @Core.defaults({
        pages: {}
    })
    @Core.types({
        data: Types.arrayOf(Types.task),
        pages: Types.shape({
            todo: Types.number,
            doing: Types.number,
            done: Types.number
        }),
        selected: Types.arrayOf(Types.number),
        onTasksUpdate: Types.func,
        onSelectionChange: Types.func,
        onPageChange: Types.func
    })
    renderComponent() {
        this.data = this.groupData();

        return (
            <div {...this.rest}
                prefix="task-column-view">
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    {columns.map(this.renderColumn)}
                </DragDropContext>
            </div>
        );
    }

    @Core.bind()
    renderColumn(column) {
        let {key, text} = column,
            {pages} = this.own,
            {data} = this,
            {length} = data[key],
            page = pages[key],
            children;

        if (data[key].length) {
            data = data[key].slice(0, 20 + (page || 0) * 10);
            children = data.map(this.renderCell);
        }

        return (
            <div
                prefix="task-column-view__column"
                key={key}>
                <div prefix="task-column-view__column-header">
                    {text}
                </div>
                <Scroller
                    prefix="task-column-view__scroller"
                    page={page}
                    hasMore={data.length < length}
                    onPageChange={event => this.handlePageChange({
                        page: event.page,
                        column: key
                    })}>
                    <Droppable droppableId={key}>
                        {provided => (
                            <div {...provided.droppableProps}
                                prefix="task-column-view__column-body"
                                innerRef={provided.innerRef}>
                                {children}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Scroller>
            </div>
        );
    }

    @Core.bind()
    renderCell(task, index) {
        let {selected} = this.own,
            key = task.key + '';

        return (
            <Draggable
                draggableId={key}
                index={index}
                key={key}>
                {provided => (
                    <TaskCard {...provided.draggableProps}
                        prefix="task-column-view__card"
                        handleProps={provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        task={task}
                        selected={selected.includes(task.key)}
                        onSelectionChange={this.handleSelectionChange}/>
                )}
            </Draggable>
        );
    }

    groupData() {
        let {data} = this.own,
            groupedData = {
                todo: [],
                doing: [],
                done: []
            };

        data.forEach(record => {
            groupedData[record.state].push(record);
        });

        return groupedData;
    }

    @Core.bind()
    handleDragEnd(event) {
        let {source, destination} = event;

        if (destination) {
            let {data} = this,
                {droppableId: srcState, index: srcIndex} = source,
                {droppableId: dstState, index: dstIndex} = destination,
                task = data[srcState][srcIndex];

            if (srcState === dstState && srcIndex <= dstIndex) {
                dstIndex++;
            }

            let nextTask = data[dstState][dstIndex] || -1;

            this.fire('onTasksUpdate', {
                nextTask,
                values: [Object.assign({}, task, {
                    state: dstState
                })]
            });
        }
    }

    @Core.bind()
    handleSelectionChange(event) {
        let {key, value} = event,
            {selected} = this.own;
        
        if (value) {
            selected = selected.concat([key]);
        } else {
            selected = selected.filter(i => i !== key);
        }

        this.fire('onSelectionChange', {selected});
    }

    @Core.bind()
    handlePageChange({page, column}) {
        let {pages} = this.own,
            newPage = Object.assign({}, pages, {
                [column]: page
            });

        this.fire('onPageChange', {type: 'columns', page: newPage});
    }
}