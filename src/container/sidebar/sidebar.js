import Core from 'core';
import Tasks from 'reducer/tasks';
import Sidebar from 'component/sidebar';

export default Core.connect(
    state => {
        let {filter, sort} = state.tasks,
            {range} = state.router,
            {views} = state.app,
            view = views[range];

        return {
            filter,
            range,
            sort,
            view,
            onFilterChange: Tasks.setFilter,
            onSortChange: Tasks.setSort
        };
    },
    Sidebar
);