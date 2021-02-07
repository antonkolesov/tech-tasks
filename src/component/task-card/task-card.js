import Core from 'core';
import Types from 'types';
import Menu from 'component/menu';
import Popup from 'component/popup';
import ToolPopup from 'container/tool-popup';
import MaterialPopup from 'container/material-popup';
import OperationPopup from 'container/operation-popup';
import TaskDetailPopup from 'container/task-detail-popup';
import ImagePopup from 'component/image-popup';
import Checkbox from 'component/checkbox';
import LoadingOverlay from 'component/loading-overlay';
import './task-card.scss';

let stateText = {
        todo: 'Выполнить',
        doing: 'Выполняется',
        done: 'Выполнено'
    },
    constrKeys = [
        'drawing',
        'assembly',
    ],
    techKeys = [
        'operations',
        'materials',
        'tools'
    ],
    constrItems = [{
        key: 'attachment:drawing',
        text: 'Чертеж'
    }, {
        key: 'attachment:assembly',
        text: 'Сборка'
    }],
    techItems = [{
        key: 'attachment:operations',
        text: 'Операции'
    }, {
        key: 'attachment:materials',
        text: 'Материалы'
    }, {
        key: 'attachment:tools',
        text: 'Инструменты'
    }],
    stateItems = [{
        key: 'state:todo',
        text: stateText.todo
    }, {
        key: 'state:doing',
        text: stateText.doing
    }, {
        key: 'state:done',
        text: stateText.done
    }];

export default class TaskCard extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'task',
            'showState',
            'handleProps',
            'selected',
            'onSelectionChange',
            'onTasksUpdate'
        ]
    }, {
        group: 'checkbox',
        include: 'selected:value'
    })
    @Core.types({
        task: Types.task,
        showState: Types.bool,
        handleProps: Types.object,
        selected: Types.bool,
        onSelectionChange: Types.func,
        onTasksUpdate: Types.func
    })
    renderComponent() {
        let {handleProps, task} = this.own,
            {partId, partName, comment, loading, state, type, created} = task,
            {showState} = this.own,
            items = [{
                key: 'constr',
                text: 'КД',
                items: constrItems
            }, {
                key: 'tech',
                text: 'ТД',
                items: techItems
            }, {
                key: 'attachment:task',
                icon: 'dots-horizontal'
            }];

        if (showState) {
            items.unshift({
                modifiers: {state: true},
                key: 'state',
                text: loading ? 'Изменение...' : stateText[state],
                items: stateItems
            });
        }

        return (
            <div {...this.rest}
                prefix="task-card"
                modifiers={{type}}>
                <div {...handleProps}
                    prefix="task-card__header"
                    modifiers={{
                        handle: !!handleProps
                    }}>
                    <Checkbox {...this.checkbox}
                        prefix="task-card__checkbox"
                        data-key={task.key + ''}
                        onChange={this.handleSelectionChange}/>
                    <div prefix="task-card__title">
                        {partId + ' (' + partName + ')'}
                    </div>
                </div>
                <div prefix="task-card__comment">
                    {comment}
                </div>
                <div prefix="task-card__footer">
                    <Menu
                        prefix="task-card__menu"
                        orientation="horizontal"
                        items={items}
                        onChange={this.handleMenuChange}
                        value={this.getValue()}/>
                    <div prefix="task-card__date">
                        {new Date(created).toLocaleDateString()}
                    </div>
                </div>
                {loading && (
                    <LoadingOverlay prefix="task-card__loading-overlay"/>
                )}
            </div>
        );
    }

    getValue() {
        let {attachments, state} = this.own.task,
            constrValues = [],
            techValue = [];

        constrKeys.forEach(i => {
            if (!(attachments[i] || attachments[i] === 0)) {
                constrValues.push('attachment:' + i);
            }
        });

        if (constrValues.length === constrKeys.length) {
            constrValues.push('constr')
        }

        techKeys.forEach(i => {
            if (!(attachments[i] || attachments[i] === 0)) {
                techValue.push('attachment:' + i);
            }
        });

        if (techValue.length === techKeys.length) {
            techValue.push('tech')
        }

        return ['state:' + state].concat(
            constrValues,
            techValue
        );
    }

    getTitle() {
        let {partId, partName} = this.own.task;
        return partId + ' (' + partName + ')';
    }

    @Core.bind()
    handleMenuChange(data) {
        let [namespace, action] = data.value.split(':'),
            {task} = this.own,
            {key} = task;
        
        switch (namespace) {
            case 'state':
                this.fire('onTasksUpdate', {
                    values: [Object.assign({}, task, {
                        state: action
                    })]
                });
                break;
            case 'attachment':
                switch (action) {
                    case 'tools':
                        Popup.open({
                            component: ToolPopup,
                            key: action,
                            taskKey: key
                        });
                        break;
                    case 'materials':
                        Popup.open({
                            component: MaterialPopup,
                            key: action,
                            taskKey: key
                        });
                        break;
                    case 'operations':
                        Popup.open({
                            component: OperationPopup,
                            key: action,
                            taskKey: key
                        });
                        break;
                    case 'task':
                        Popup.open({
                            component: TaskDetailPopup,
                            key: action,
                            taskKey: key
                        });
                        break;
                    case 'drawing':
                        Popup.open({
                            component: ImagePopup,
                            key: 'imageViewer',
                            title: 'Чертеж детали ' + this.getTitle(),
                            src: 'static/drawing/' + task.attachments.drawing + '.png'
                        });
                        break;
                    case 'assembly':
                        Popup.open({
                            component: ImagePopup,
                            key: 'imageViewer',
                            title: 'Чертеж сборки ' + this.getTitle(),
                            src: 'static/assembly/' + task.attachments.assembly + '.png'
                        });
                        break;
                }
                break;
        }
    }

    @Core.bind()
    handleSelectionChange({event, value}) {
        let {key} = event.currentTarget.parentNode.dataset;
        
        if (key) {
            this.fire('onSelectionChange', {
                key: +key,
                value
            });
        }
    }
}