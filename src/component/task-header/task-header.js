import Core from 'core';
import Types from 'types';
import MediaQuery from 'component/media-query';
import Button from 'component/button';
import Menu from 'component/menu';
import Avatar from 'component/avatar';
import Popup from 'component/popup';
import TaskAddPopup from 'container/task-add-popup';
import TaskEditPopup from 'container/task-edit-popup';
import ProfilePopup from 'container/profile-popup';
import HelpPopup from 'container/help-popup';
import AboutPopup from 'component/about-popup';
import './task-header.scss';

let taskItems = [{
        key: 'task:add',
        text: 'Добавить'
    }, {
        key: 'task:edit',
        text: 'Изменить'
    }, {
        key: 'task:remove',
        text: 'Удалить'
    }],
    stateItems = [{
        key: 'state:todo',
        text: 'Выполнить'
    }, {
        key: 'state:doing',
        text: 'Выполняется'
    }, {
        key: 'state:done',
        text: 'Выполнено'
    }],
    rangeItems = [{
        key: 'range:all',
        text: 'Все'
    }, {
        key: 'range:date',
        text: 'День'
    }, {
        key: 'range:month',
        text: 'Месяц'
    }, {
        key: 'range:year',
        text: 'Год'
    }],
    viewItems = (() => {
        let items = {
            list: {
                key: 'view:list',
                icon: 'view-sequential',
                text: 'Список'
            },
            grid: {
                key: 'view:grid',
                icon: 'view-grid',
                text: 'Таблица'
            },
            columns: {
                key: 'view:columns',
                icon: 'view-parallel',
                text: 'Колонки'
            },
            calendar: {
                key: 'view:calendar',
                icon: 'calendar',
                text: 'Календарь'
            }
        };
        return {
            all: [items.list, items.grid, items.columns],
            date: [items.list, items.grid, items.columns],
            month: [items.list, items.grid, items.columns, items.calendar],
            year: [items.list, items.grid, items.columns, items.calendar]
        }
    })(),
    accountItems = [{
        key: 'account:profile',
        text: 'Профиль'
    }, {
        key: 'account:help',
        text: 'Справка'
    }, {
        key: 'account:about',
        text: 'О программе'
    }, {
        key: 'account:exit',
        text: 'Выход'
    }];

export default class TaskHeader extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'collapsed',
            'removeConfirm',
            'notifications',
            'range',
            'selected',
            'tasks',
            'theme',
            'view',
            'onNotificationOpen',
            'onSidebarToggle',
            'onSignOut',
            'onTasksRemove',
            'onTasksUpdate',
            'onRangeChange',
            'onViewChange',
            'onMessengerToggle',
            'onThemeChange',
            'onConfirmChange',
            'onContactsRead'
        ]
    })
    @Core.innerRefs(
        'trigger',
        'menu'
    )
    @Core.types({
        collapsed: Types.exact({
            left: Types.bool,
            right: Types.bool
        }),
        removeConfirm: Types.bool,
        notifications: Types.oneOfType([
            Types.arrayOf(Types.contact),
            Types.loading
        ]),
        range: Types.oneOf(['all', 'date', 'month', 'year']),
        selected: Types.arrayOf(Types.number),
        tasks: Types.oneOfType([
            Types.arrayOf(Types.task),
            Types.loading
        ]),
        theme: Types.theme,
        view: Types.oneOf(['list', 'grid', 'columns', 'calendar']),
        onNotificationOpen: Types.func,
        onSidebarToggle: Types.func,
        onSignOut: Types.func,
        onTasksRemove: Types.func,
        onRangeChange: Types.func,
        onViewChange: Types.func,
        onMessengerToggle: Types.func,
        onThemeChange: Types.func,
        onConfirmChange: Types.func,
        onContactsRead: Types.func
    })
    renderComponent() {
        return (
            <MediaQuery
                onInitialize={this.handleInitialize}
                onResize={this.handleResize}>
                {this.renderChildren}
            </MediaQuery>
        );
    }

    @Core.bind()
    renderChildren(media) {
        let {mode} = media,
            {triggerRef, menuRef} = this.innerRefs,
            {collapsed, notifications, range, selected, tasks, view, onSidebarToggle} = this.own,
            taskItem = {
                key: 'task',
                text: 'Задача',
                items: taskItems
            },
            stateItem = {
                key: 'state',
                text: 'Состояние',
                items: stateItems
            },
            rangeItem = {
                key: 'range',
                text: 'Интервал',
                items: rangeItems
            },
            viewItem = {
                key: 'view',
                text: 'Вид',
                submenuMode: 'text',
                items: viewItems[range]
            },
            taskMenu = {
                inline: true,
                items: taskItems
            },
            stateMenu = {
                inline: true,
                items: stateItems
            },
            rangeMenu = {
                inline: true,
                items: rangeItems
            },
            viewMenu = {
                inline: true,
                mode: 'icon',
                items: viewItems[range]
            },
            messageItem = {
                key: 'messenger',
                text: 'Уведомления',
                icon: 'bell',
                'data-animated': Array.isArray(notifications) && notifications.length,
                items: [{
                    as: 'div',
                    key: 'messenger:notifications',
                    children: this.renderNotifications()
                }].concat({
                    key: 'messenger:toggle',
                    text: (collapsed.right ? 'Открыть' : 'Закрыть') + ' мессенджер'
                })
            },
            accountItem = {
                key: 'account',
                icon: 'account-circle',
                items: [{
                    key: 'account:theme',
                    as: 'div',
                    prefix: 'task-header__theme-item',
                    children: this.renderThemeItem()
                }].concat(accountItems)
            },
            separator = {
                as: '-'
            },
            divider = {
                as: '|'
            },
            items = [
                /*00*/ taskItem,
                /*01*/ stateItem,
                /*02*/ rangeItem,
                /*03*/ viewItem,
                /*04*/ taskMenu,
                /*05*/ divider,
                /*06*/ stateMenu,
                /*07*/ divider,
                /*08*/ rangeMenu,
                /*09*/ divider,
                /*10*/ viewMenu,
                /*11*/ separator,
                /*12*/ divider,
                /*13*/ messageItem,
                /*14*/ accountItem
            ],
            value = [];

        if (mode !== null) {
            items[0] = items[1] = items[2] = items[3] = null;

            switch (mode) {
                case 5:
                    items[13].text = null;
                case 4:
                    items[3] = viewItem;
                    items[9] = items[10] = null;
                case 3:
                    items[2] = rangeItem;
                    items[7] = items[8] = null;
                case 2:
                    items[1] = stateItem;
                    items[5] = items[6] = null;
                case 1:
                    items[0] = taskItem;
                    items[4] = null;
            }
        }

        if (!selected || selected.length === 0) {
            value.push(
                'task:edit',
                'task:remove',
                'state',
                'state:todo',
                'state:doing',
                'state:done'
            );
        } else {
            let state;

            for (let i = 0; i < selected.length; i++) {
                let taskKey = selected[i],
                    task = tasks.find(j => j.key === taskKey);

                if (state) {
                    if (state !== task.state) {
                        state = null;
                        break;
                    }
                } else {
                    state = task.state;
                }
            }

            if (state) {
                value.push('state:' + state);
            }
        }

        range && (value.push('range:' + range));
        view && (value.push('view:' + view));

        return (
            <div {...this.rest} {...media}
                prefix="task-header">
                <Button
                    prefix="task-header__trigger"
                    modifiers={{
                        collapsed: collapsed.left
                    }}
                    title={(collapsed.left ? 'Открыть' : 'Закрыть') + ' фильтр'}
                    icon="menu"
                    innerRef={triggerRef}
                    onClick={onSidebarToggle}/>
                <Menu
                    prefix="task-header__menu"
                    orientation="horizontal"
                    items={items}
                    value={value}
                    innerRef={menuRef}
                    onChange={this.handleMenuChange}
                    onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }

    renderNotifications() {
        let {notifications} = this.own,
            children;

        if (!notifications || notifications === Core.loading) {
            children = null;
        } else if (notifications.length === 0) {
            children = (
                <div prefix="task-header__notification-not-found">
                    Нет новых уведомлений!
                </div>
            );
        } else {
            children = notifications.map(i => {
                let {key, name, message, active} = i,
                    {text, sended} = message,
                    userName = name.last + ' ' + name.first + ' ' + name.middle;

                return (
                    <div
                        prefix="task-header__notification"
                        key={key}
                        data-key={key}
                        onClick={this.handleNotificationClick}>
                        <Avatar
                            prefix="task-header__notification-left"
                            size="small"
                            active={true}
                            contact={i}/>
                        <div prefix="task-header__notification-center">
                            <div prefix="task-header__notification-name">
                                {userName}
                            </div>
                            <div prefix="task-header__notification-message">
                                {text}
                            </div>
                        </div>
                        <div prefix="task-header__notification-right">
                            <div
                                prefix="task-header__notification-status"
                                modifiers={{active}}/>
                            <div prefix="task-header__notification-time">
                                {Core.formatDate(new Date(sended), 'd M')}
                            </div>
                        </div>
                    </div>
                );
            });
        }

        return <>{children}</>
    }

    renderThemeItem() {
        let {theme} = this.own,
            rows = [],
            cells,
            pos;

        ['red', 'green', 'blue', 'purple'].forEach((i, k) => {
            pos = k % 4;

            if (!pos) {
                rows.push(
                    <div
                        prefix="task-header__theme-row"
                        key={rows.length + ''}>
                        {cells = []}
                    </div>
                );
            }

            cells[pos] = (
                <div
                    prefix="task-header__theme-cell"
                    modifiers={{
                        theme: i,
                        disabled: i === theme
                    }}
                    key={i}
                    data-theme={i}
                    onClick={this.handleThemeItemClick}/>
            );
        });

        return <>
            {rows}
        </>;
    }

    @Core.bind()
    handleInitialize() {
        let {triggerEl, menuEl} = this.innerRefs,
            {children} = menuEl,
            trigger = triggerEl.offsetWidth,
            viewOffset = children[10].firstChild.offsetWidth,
            viewMenu = viewOffset * 4,
            [taskItem, stateItem, rangeItem, viewItem, taskMenu, divider, stateMenu,, rangeMenu,,,,, messageItem, accountItem] = Array.prototype.slice.call(children).map(i => i.offsetWidth),
            w1 = trigger + taskMenu + stateMenu + rangeMenu + viewMenu + messageItem + accountItem + divider * 4,
            w2 = w1 + taskItem - taskMenu,
            w3 = w2 + stateItem - stateMenu - divider,
            w4 = w3 + rangeItem - rangeMenu - divider,
            w5 = w4 + viewItem - viewMenu - divider,
            ws1 = [w1, w2, w3, w4, w5, Number.NEGATIVE_INFINITY],
            ws2 = ws1.concat([]);

        for (let i = 0; i < ws2.length - 2; i++) {
            ws2[i] -= viewOffset;
        }

        this.mediaProps = {ws1, ws2};
    }

    @Core.bind()
    handleResize(event) {
        let {ws1, ws2} = this.mediaProps,
            {clientWidth} = event,
            {range} = this.own,
            mode = ((range === 'all' || range === 'date') ? ws2 : ws1).findIndex(i => i < clientWidth);

        return mode;
    }

    @Core.bind()
    handleMenuChange(event) {
        let [namespace, action] = event.value.split(':'),
            {removeConfirm, selected, tasks} = this.own;

        switch (namespace) {
            case 'task':
                switch (action) {
                    case 'add':
                        Popup.open({
                            key: 'task-add',
                            component: TaskAddPopup
                        });
                        break;
                    case 'edit':
                        Popup.open({
                            key: 'task-edit',
                            component: TaskEditPopup
                        });
                        break;
                    case 'remove':
                        let char = selected.length > 1 ? 'и' : 'у';

                        if (removeConfirm) {
                            Popup.open({
                                key: 'remove-confirm',
                                type: 'confirm',
                                title: 'Удалить задач' + char + '?',
                                text: 'Вы действительно хотите удалить эт' + char + ' задач' + char + '?',
                                onCheckboxChange: this.handleCheckboxChange,
                                onConfirm: this.handleConfirm
                            });
                        } else {
                            this.fire('onTasksRemove', {tasks: selected});
                        }
                        break;
                }
                break;
            case 'state':
                this.fire('onTasksUpdate', {
                    values: selected.map(i => Object.assign({}, tasks.find(j => j.key === i), {
                        state: action
                    }))
                });
                break;
            case 'range':
                this.fire('onRangeChange', {range: action});
                break;
            case 'view':
                this.fire('onViewChange', {view: action});
                break;
            case 'messenger':
                switch (action) {
                    case 'toggle':
                        this.fire('onMessengerToggle');
                        break;
                }
                break;
            case 'account':
                switch (action) {
                    case 'profile':
                        Popup.open({
                            key: 'profile',
                            component: ProfilePopup
                        });
                        break;
                    case 'help':
                        Popup.open({
                            key: 'help',
                            component: HelpPopup
                        });
                        break;
                    case 'about':
                        Popup.open({
                            key: 'about',
                            component: AboutPopup
                        });
                        break;
                    case 'exit':
                        this.fire('onSignOut', {});
                        break;
                }
                break;
        }
    }

    @Core.bind()
    handleRequestClose() {
        if (this.requestClose) {
            this.requestClose = false;
            return true;
        }
    }

    @Core.bind()
    handleThemeItemClick(event) {
        let {theme} = event.currentTarget.dataset;
        this.requestClose = true;
        this.fire('onThemeChange', {theme});
    }

    @Core.bind()
    handleNotificationClick(event) {
        let {currentTarget, target} = event,
            {key} = currentTarget.dataset,
            {notifications} = this.own;

        this.requestClose = true;

        if (currentTarget === target && key) {
            key = +key;
            
            this.fire('onNotificationOpen', {
                contact: notifications.find(i => i.key === key),
                activeTab: 'dialogue'
            });
        }
    }

    @Core.bind()
    handleCheckboxChange({value}) {
        this.fire('onConfirmChange', {confirm: !value});
    }

    @Core.bind()
    handleConfirm() {
        let {selected} = this.own;
        this.fire('onTasksRemove', {tasks: selected});
    }
    
    @Core.bind()
    handleAfterRender() {
        let {notifications} = this.own;

        if (!notifications) {
            this.fire('onContactsRead');
        }
    }
}