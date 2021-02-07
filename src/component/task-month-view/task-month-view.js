import Core from 'core';
import Types from 'types';
import MonthGrid from 'component/month-grid';
import Popup from 'component/popup';
import TaskDetailPopup from 'container/task-detail-popup';
import MediaQuery from 'component/media-query';
import './task-month-view.scss';

let dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export default class TaskMonthView extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'data',
            'date',
            'selected',
            'onPathChange',
            'onSelectionChange'
        ]
    })
    @Core.defaults({
        selected: []
    })
    @Core.types({
        data: Types.arrayOf(Types.task),
        date: Types.instanceOf(Date),
        selected: Types.arrayOf(Types.number),
        onPathChange: Types.func,
        onSelectionChange: Types.func
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
    renderChildren(mediaQuery) {
        let {mode} = mediaQuery,
            {date} = this.own;

        if (mode === null) {
            return (
                <div {...mediaQuery}
                    prefix="task-month-view"/>
            );
        }

        this.groupedData = this.groupData();

        return (
            <MonthGrid {...this.rest} {...mediaQuery}
                prefix="task-month-view"
                date={date}
                renderCell={this.renderCell}
                onClick={this.handleClick}
                dayNames={mode === '-' ? undefined : mode}/>
        );
    }

    @Core.bind()
    renderCell(value) {
        let date = value.getDate(),
            tasks = this.groupedData[date],
            {selected} = this.own;

        return <>
            <div
                prefix="task-month-view__date-header"
                data-key={date}>
                {date}
            </div>
            <div prefix="task-month-view__date-body">
                {tasks && tasks.map(i => (
                    <div
                        prefix="task-month-view__task"
                        modifiers={{
                            type: i.type,
                            state: i.state,
                            selected: selected.includes(i.key)
                        }}
                        key={i.key}
                        data-task={i.key}>
                        <div prefix="task-month-view__part-name">
                            {i.partId + ' (' + i.partName + ')'}
                        </div>
                    </div>
                ))}
            </div>
        </>;
    }

    groupData() {
        let {data} = this.own,
            groupedData = {};

        data.forEach(i => {
            let date = new Date(i.created).getDate();
            (groupedData[date] || (groupedData[date] = [])).push(i);
        });

        return groupedData;
    }

    @Core.bind()
    handleClick(event) {
        let {key} = event.target.dataset;

        if (key) {
            let {date} = this.own,
                path = Core.formatDate(
                    new Date(date.getFullYear(), date.getMonth(), +key),
                    'Y-m-d'
                );

            this.fire('onPathChange', {path});
        } else {
            let {task} = event.target.dataset;

            if (task) {
                task =+ task;
                let {key} = this.own.data.find(i => i.key === task),
                    {ctrlKey} = event;

                if (ctrlKey) {
                    let {selected} = this.own,
                        value = !selected.includes(task);

                    if (value) {
                        selected = selected.concat([task]);
                    } else {
                        selected = selected.filter(i => i !== task);
                    }

                    this.fire('onSelectionChange', {selected});
                } else {
                    Popup.open({
                        key: 'task',
                        component: TaskDetailPopup,
                        taskKey: key
                    });
                }
            }
        }
    }

    @Core.bind()
    handleResize(event) {
        let {clientWidth} = event;
        return clientWidth < 765 ? '-' : dayNames;
    }
}