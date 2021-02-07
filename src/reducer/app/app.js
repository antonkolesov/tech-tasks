import Core from 'core';

export default class App {

    static prefix() {
        return 'App';
    }

    static defaults() {
        let views = localStorage.getItem('views'),
            theme = localStorage.getItem('theme') || 'blue';

        views = views ? JSON.parse(views) : {
            all: 'list',
            date: 'grid',
            month: 'calendar',
            year: 'calendar'
        };

        App.setFavicon(theme);

        return {
            views,
            theme,
            collapsed: {
                left: localStorage.getItem('sidebar-collapsed') === 'true' ? true : false,
                right: localStorage.getItem('messenger-collapsed') === 'true' ? true : false
            },
            activeAttachment: localStorage.getItem('active-attachment') || 'operations',
            pages: {
                list: 0,
                grid: 0,
                columns: {
                    todo: 0,
                    doing: 0,
                    done: 0
                }
            },
            addConfirm: true,
            editConfirm: true,
            removeConfirm: true
        };
    }

    @Core.dispatch()
    static setAddConfirm({state, confirm}) {
        return state.setIn(['app', 'addConfirm'], confirm);
    }

    @Core.dispatch()
    static setEditConfirm({state, confirm}) {
        return state.setIn(['app', 'editConfirm'], confirm);
    }
    
    @Core.dispatch()
    static setRemoveConfirm({state, confirm}) {
        return state.setIn(['app', 'removeConfirm'], confirm);
    }

    @Core.dispatch()
    static toggleSidebar({state}) {
        let {left} = state.app.collapsed;
        localStorage.setItem('sidebar-collapsed', !left);
        return state.setIn(['app', 'collapsed', 'left'], !left);
    }

    @Core.dispatch()
    static toggleMessenger({state}) {
        let {right} = state.app.collapsed;
        localStorage.setItem('messenger-collapsed', !right);
        return state.setIn(['app', 'collapsed', 'right'], !right);
    }

    @Core.dispatch()
    static setView({state, view}) {
        let {range} = state.router,
            {views} = state.app;

        views = views.set(range, view);
        localStorage.setItem('views', JSON.stringify(views));

        state = state.setIn(['app', 'views'], views);
        state = Core.getReducer('Tasks').pureSetSelectedTasks({state});
        state = App.pureResetPages({state});

        return state;
    }

    @Core.dispatch()
    static setTheme({state, theme}) {
        localStorage.setItem('theme', theme);
        App.setFavicon(theme);
        return state.setIn(['app', 'theme'], theme);
    }

    @Core.dispatch()
    static setActiveAttachment({state, activeAttachment}) {
        localStorage.setItem('active-attachment', activeAttachment);
        return state.setIn(['app', 'activeAttachment'], activeAttachment);
    }

    @Core.dispatch()
    static setPage({state, type, page}) {
        return state.setIn(['app', 'pages', type], page);
    }

    @Core.dispatch()
    static resetPages({state}) {
        return state.setIn(['app', 'pages'], {list: 0, grid: 0, columns: {todo: 0, doing: 0, done: 0}});
    };

    static setFavicon(color) {
        if (!this.favicon) {
            this.favicon = document.head.querySelector('link[rel=icon]');
        }
        
        this.favicon.href = 'static/favicon/' + color + '.png';
    }
}