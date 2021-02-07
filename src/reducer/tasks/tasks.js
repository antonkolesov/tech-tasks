import Core from 'core';
import Data from 'data';

export default class Tasks {

    static prefix() {
        return 'Tasks';
    }

    static defaults() {
        return {
            all: null,
            selected: [],
            filter: {
                text: '',
                fields: ['partId', 'partName', 'comment'],
                types: ['create', 'update', 'destroy'],
                states: ['todo', 'doing', 'done'],
                caseSensetive: false
            },
            sort: {
                sort: 'partId',
                order: 'asc'
            }
        }
    }

    @Core.async()
    static readTasks({date}) {
        Tasks.setTasks({
            tasks: Core.loading
        });

        Data.fetch('Tasks:read', date).then(
            tasks => Tasks.setTasks({tasks, sort: true})
        );
    }

    @Core.async()
    static createTasks({values, complete}) {
        Data.fetch('Tasks:create', values).then(
            tasks => {
                Tasks.addTasks({tasks});
                complete();
            }
        );
    }

    @Core.async()
    static deleteTasks({tasks}) {
        Data.fetch('Tasks:delete', tasks).then(
            tasks => Tasks.removeTasks({tasks})
        );
    }

    @Core.async()
    static updateTasks({values, nextTask, complete}) {
        Tasks.replaceTasks({
            nextTask,
            tasks: values.map(i => Object.assign({}, i, {
                loading: true
            }))
        });

        Data.fetch('Tasks:update', values).then(
            tasks => {
                Tasks.replaceTasks({tasks, nextTask});
                complete && complete();
            }
        );
    }

    @Core.dispatch()
    static setTasks({state, tasks, sort}) {
        state = state.setIn(['tasks', 'all'], tasks);
        
        if (sort) {
            state = Core.getReducer('Tasks').pureSetSort({state});
        }

        return state;
    }

    @Core.dispatch()
    static addTasks({state, tasks}) {
        let {all} = state.tasks;
        
        state = Tasks.pureSetSelectedTasks({state});
        state = state.setIn(['tasks', 'all'], tasks.concat(all));

        return state;
    }

    @Core.dispatch()
    static replaceTasks({state, tasks, nextTask}) {
        let {all} = state.tasks;

        if (nextTask) {
            all = [].concat(all).filter(i => !tasks.find(j => j.key === i.key));
            
            if (nextTask === -1) {
                all.push(...tasks);
            } else {
                all.splice(
                    all.findIndex(i => i.key === nextTask.key),
                    0,
                    ...tasks
                );
            }
        } else {
            all = all.map(i => (
                tasks.find(j => j.key === i.key) || i
            ));
        }

        state = state.setIn(['tasks', 'all'], all);
        state = Tasks.pureSetSelectedTasks({state});
        
        return state;
    }

    @Core.dispatch()
    static removeTasks({state, tasks}) {
        let {all} = state.tasks;

        all = all.filter(i => !tasks.includes(i.key));

        state = state.setIn(['tasks', 'all'], all);
        state = Tasks.pureSetSelectedTasks({state});

        return state;
    }

    @Core.dispatch()
    static setSelectedTasks({state, selected = []}) {
        return state.setIn(['tasks', 'selected'], selected);
    }

    @Core.dispatch()
    static setSort({state, values}) {
        if (values === undefined) {
            values = state.tasks.sort;
        }

        let {sort, order} = values,
            {all} = state.tasks,
            sign = order === 'asc' ? 1 : -1;

        all = [].concat(all).sort((a, b) => (a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0) * sign);
        
        state = state.setIn(['tasks', 'all'], all);
        state = state.setIn(['tasks', 'sort'], values);
        state = Core.getReducer('App').pureResetPages({state});

        return state;
    }

    @Core.dispatch()
    static setFilter({state, values}) {
        state = state.setIn(['tasks', 'filter'], values);
        state = Tasks.pureSetSelectedTasks({state});
        state = Core.getReducer('App').pureResetPages({state});
        return state;
    }

    @Core.memo(() => [
        state => state.tasks.all,
        state => state.tasks.filter,
        state => state.router.date,
        state => state.router.range
    ])
    static getFilteredTasks(tasks, filter, date, range) {
        if (Array.isArray(tasks)) {
            let {types, states, text, fields, caseSensetive} = filter;

            tasks = tasks.filter(i => (
                types.includes(i.type) && states.includes(i.state)
            ));

            if (text) {
                text = new RegExp(
                    text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                    caseSensetive ? '' : 'i'
                );

                tasks = tasks.filter(i => {
                    for (let j = 0; j < fields.length; j++) {
                        if (text.test(i[fields[j]])) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            if (range !== 'all') {
                let from, to,
                    y = date.getFullYear(),
                    m = date.getMonth(),
                    d = date.getDate();

                switch (range) {
                    case 'date':
                        from = new Date(y, m, d);
                        to = new Date(y, m, d + 1);
                        break;
                    case 'month':
                        from = new Date(y, m, 1);
                        to = new Date(y, m + 1, 1);
                        break;
                    case 'year':
                        from = new Date(y, 0, 1),
                        to = new Date(y + 1, 0, 1);
                        break;
                }

                tasks = tasks.filter(i => i.created >= from && i.created < to);
            }
        }

        return tasks;
    }
}