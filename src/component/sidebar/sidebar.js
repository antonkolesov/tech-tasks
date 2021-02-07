import Core from 'core';
import Types from 'types';
import TaskFilterForm from 'component/task-filter-form';
import TaskSortForm from 'component/task-sort-form';
import './sidebar.scss';

export default class Sidebar extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'range',
            'view'
        ]
    }, {
        group: 'filter',
        include: [
            'filter:values',
            'onFilterChange:onChange'
        ]
    }, {
        group: 'sort',
        include: [
            'sort:values',
            'onSortChange:onChange'
        ]
    })
    @Core.types({
        range: Types.oneOf(['all', 'date', 'month', 'year']),
        view: Types.oneOf(['list', 'grid', 'columns', 'calendar'])
    })
    renderComponent() {
        let {range, view} = this.own,
            disabled = range === 'year' && view === 'calendar';

        return (
            <div {...this.rest}
                prefix="sidebar">
                <TaskFilterForm {...this.filter}
                    prefix="sidebar__task-filter-form"/>
                <TaskSortForm {...this.sort}
                    prefix="sidebar__task-sort-form"
                    disabled={disabled}/>
            </div>
        );
    }
}