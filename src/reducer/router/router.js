import Core from 'core';

export default class Router {

    static prefix() {
        return 'Router';
    }

    static defaults() {
        return Router.parsePath();
    }

    static parsePath(path = location.hash) {
        let route = {page: 'not-found'};

        if (!path) {
            history.replaceState(null, null, location.pathname + (path = '#'));
        }

        let match = path.match(/^#(?:([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?\/?)?$/);

        if (match) {
            let range, date;

            match = match.slice(1, 4).filter(i => i);

            switch (match.length) {
                case 0:
                    range = 'all';
                    break;
                case 1:
                    range = 'year';
                    break;
                case 2:
                    range = 'month';
                    break;
                case 3:
                    range = 'date';
                    break;
            }

            date = new Date(
                match.join('-') || Date.now()
            )

            if (!isNaN(date)) {
                Object.assign(route, {
                    page: 'tasks',
                    range,
                    date
                });
            }
        }

        return route;
    }

    @Core.dispatch()
    static setRange({state, range}) {
        let {date} = state.router,
            path = '';

        switch (range) {
            case 'date':
                path = Core.formatDate(date, 'Y-m-d');
                break;
            case 'month':
                path = Core.formatDate(date, 'Y-m');
                break;
            case 'year':
                path = Core.formatDate(date, 'Y');
                break;
        }

        return Router.pureSetPath({state, path});
    }

    @Core.dispatch()
    static setPath({state, path, silent}) {
        if (path.charAt(0) !== '#') {
            path = '#' + path;
        }

        if (!silent) {
            history.pushState(path, null, location.pathname + path);
        }

        state = state.set('router', Router.parsePath(path));
        state = state.setIn(['tasks', 'selected'], []);
        state = state.setIn(['app', 'pages'], {list: 0, grid: 0, columns: {todo: 0, doing: 0, done: 0}});

        return state;
    }
}

window.onpopstate = () => {
    Router.setPath({
        path: location.hash,
        silent: true
    });
}