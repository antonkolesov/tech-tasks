import Core from 'core';
import Tasks from 'reducer/tasks';
import Messages from 'reducer/messages';
import App from 'reducer/app';
import Router from 'reducer/router';
import Account from 'reducer/account';
import TaskHeader from 'component/task-header';

export default Core.connect(
    state => {
        let {range} = state.router,
            {selected} = state.tasks,
            {collapsed, views, removeConfirm, theme} = state.app,
            view = views[range],
            notifications = Messages.getNotifications(state),
            tasks = Tasks.getFilteredTasks(state);

        return {
            collapsed,
            notifications,
            removeConfirm,
            range,
            selected,
            tasks,
            theme,
            view,
            onNotificationOpen: Messages.setActiveTab,
            onMessengerToggle: App.toggleMessenger,
            onRangeChange: Router.setRange,
            onSidebarToggle: App.toggleSidebar,
            onSignOut: Account.updateAccount,
            onTasksUpdate: Tasks.updateTasks,
            onTasksRemove: Tasks.deleteTasks,
            onThemeChange: App.setTheme,
            onViewChange: App.setView,
            onConfirmChange: App.setRemoveConfirm,
            onContactsRead: Messages.readContacts
        };
    },
    TaskHeader
);