import Core from 'core';
import LoadingOverlay from 'component/loading-overlay';
import NotFoundOverlay from 'component/not-found-overlay';
import TaskListView from 'component/task-list-view';
import TaskGridView from 'component/task-grid-view';
import TaskColumnView from 'component/task-column-view';
import TaskMonthView from 'component/task-month-view';
import TaskYearView from 'component/task-year-view';
import DatePagination from 'component/date-pagination';
import './task-view-switcher.scss';

export default class TaskViewSwitcher extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'date',
            'filter',
            'pages',
            'range',
            'sort',
            'tasks',
            'view',
            'onTasksRead'
        ]
    }, {
        group: 'listView',
        include: [
            'tasks:data',
            'selected',
            'sort',
            'onSelectionChange',
            'onSortChange',
            'onPageChange'
        ]
    }, {
        group: 'gridView',
        include: [
            'tasks:data',
            'selected',
            'onSelectionChange',
            'onPageChange',
            'onTasksUpdate'
        ]
    }, {
        group: 'columnView',
        include: [
            'tasks:data',
            'selected',
            'onSelectionChange',
            'onPageChange',
            'onTasksUpdate'
        ]
    }, {
        group: 'monthView',
        include: [
            'tasks:data',
            'selected',
            'date',
            'onSelectionChange',
            'onPathChange'
        ]
    }, {
        group: 'yearView',
        include: [
            'tasks:data',
            'date',
            'onPathChange'
        ]
    }, {
        group: 'pagination',
        include: [
            'date',
            'range'
        ]
    })
    renderComponent() {
        let {pages, range, tasks, view} = this.own,
            children;

        if (!tasks) {
            children = (
                <div prefix="task-view-switcher__empty"/>
            );
        } else if (tasks === Core.loading) {
            children = (
                <LoadingOverlay prefix="task-view-switcher__loading-overlay"/>
            );
        } else {
            let isDirty = this.isDirty();

            switch (view) {
                case 'list':
                    children = tasks.length ? (
                        <TaskListView {...this.listView}
                            prefix="task-view-switcher__task-list-view"
                            page={isDirty ? undefined : pages.list}/>
                    ) : (
                        <NotFoundOverlay
                            prefix="task-view-switcher__not-found-overlay"/>
                    );
                    break;
                case 'grid':
                    children = tasks.length ? (
                        <TaskGridView {...this.gridView}
                            prefix="task-view-switcher__task-grid-view"
                            page={isDirty ? undefined : pages.grid}/>
                    ) : (
                        <NotFoundOverlay
                            prefix="task-view-switcher__not-found-overlay"/>
                    );
                    break;
                case 'columns':
                    children = (
                        <TaskColumnView {...this.columnView}
                            prefix="task-view-switcher__task-column-view"
                            pages={isDirty ? undefined : pages.columns}/>
                    );
                    break;
                case 'calendar':
                    switch (range) {
                        case 'month':
                            children = (
                                <TaskMonthView {...this.monthView}
                                    prefix="task-view-switcher__task-month-view"/>
                            );
                            break;
                        case 'year':
                            children = (
                                <TaskYearView {...this.yearView}
                                    prefix="task-view-switcher__task-year-view"/>
                            );
                            break;
                    }
                    break;
            }

            if (range !== 'all') {
                children = <>
                    {children}
                    <DatePagination {...this.pagination}
                        prefix="task-view-switcher__date-pagination"
                        onChange={this.handleDateChange}/>
                </>;
            }
        }

        return (
            <div {...this.rest}
                prefix="task-view-switcher">
                {children}
            </div>
        );
    }

    isDirty() {
        let {date, filter, range, sort, view} = this.own,
            {cachedProps = {}} = this;

        this.cachedProps = {
            date,
            range,
            view,
            filter,
            sort
        };

        return !(
            cachedProps.date &&
            cachedProps.date.getTime() === date.getTime() &&
            cachedProps.range === range &&
            cachedProps.view === view &&
            cachedProps.filter === filter &&
            cachedProps.sort === sort
        )
    }

    @Core.bind()
    handleAfterRender() {
        let {date, tasks} = this.own;

        if (!tasks) {
            this.fire('onTasksRead', {date});
        }
    }

    @Core.bind()
    handleDateChange({value}) {
        let {range} = this.own,
            path;

        switch (range) {
            case 'date':
                path = Core.formatDate(value, 'Y-m-d');
                break;
            case 'month':
                path = Core.formatDate(value, 'Y-m');
                break;
            case 'year':
                path = Core.formatDate(value, 'Y');
                break;
        }

        this.fire('onPathChange', {path});
    }
}