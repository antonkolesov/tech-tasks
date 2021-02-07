import Core from 'core';
import Tasks from 'reducer/tasks';
import App from 'reducer/app';
import Router from 'reducer/router';
import TaskViewSwitcher from 'component/task-view-switcher';

export default Core.connect(
    state => {
        let {date, range} = state.router,
            {views, pages} = state.app,
            {filter, selected, sort} = state.tasks,
            view = views[range],
            tasks = Tasks.getFilteredTasks(state);

        return {
            date,
            filter,
            pages,
            range,
            selected,
            sort,
            tasks,
            view,
            onPageChange: App.setPage,
            onPathChange: Router.setPath,
            onSelectionChange: Tasks.setSelectedTasks,
            onSortChange: Tasks.setSort,
            onTasksRead: Tasks.readTasks,
            onTasksUpdate: Tasks.updateTasks
        };
    },
    TaskViewSwitcher
);