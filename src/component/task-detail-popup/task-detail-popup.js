import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Menu from 'component/menu';
import LoadingOverlay from 'component/loading-overlay';
import NotFoundOverlay from 'component/not-found-overlay';
import OperationList from 'component/operation-list';
import MaterialTable from 'component/material-table';
import ToolTable from 'component/tool-table';
import ImagePopup from 'component/image-popup';
import './task-detail-popup.scss';

let stateItems = [{
        key: 'todo',
        text: 'Выполнить'
    }, {
        key: 'doing',
        text: 'Выполняется'
    }, {
        key: 'done',
        text: 'Выполнено'
    }],
    fileItems = [{
        key: 'drawing',
        text: 'Чертеж'
    }, {
        key: 'assembly',
        text: 'Сборка'
    }],
    attachmentItems = [{
        key: 'operations',
        text: 'Операции'
    }, {
        key: 'materials',
        text: 'Материалы'
    }, {
        key: 'tools',
        text: 'Инструменты'
    }],
    notFoundText = {
        operations: 'Операции не найдены!',
        materials: 'Материалы не найдены!',
        tools: 'Инструменты не найдены!'
    };

export default class TaskDetailPopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'activeAttachment',
            'taskKey',
            'task',
            'data',
            'dataKey',
            'onLoad',
            'onTasksUpdate',
            'onActiveAttachmentChange'
        ]
    }, {
        group: 'attachment',
        include: [
            'data',
            'sort',
            'onSortChange'
        ]
    }, {
        group: 'tabBar',
        include: 'onAttachmentChange:onItemClick'
    })
    @Core.defaults({
        resize: ['left', 'right', 'top', 'bottom']
    })
    @Core.types({
        activeAttachment: Types.oneOf(['operations', 'materials', 'tools']),
        taskKey: Types.number,
        task: Types.task,
        data: Types.oneOfType([
            Types.arrayOf(Types.operation),
            Types.arrayOf(Types.material),
            Types.arrayOf(Types.tool),
            Types.loading
        ]),
        dataKey: Types.number,
        onLoad: Types.func,
        onTasksUpdate: Types.func,
        onActiveAttachmentChange: Types.func
    })
    renderComponent() {
        let {task, activeAttachment} = this.own,
            {partId, partName, state, comment, attachments, loading} = task,
            constValue = [],
            stateMenuProps = {};

        ['drawing', 'assembly'].forEach(i => {
            if (!(attachments[i] || attachments[i] === 0)) {
                constValue.push(i);
            }
        });

        if (loading) {
            stateMenuProps.disabled = true;
        } else {
            stateMenuProps.value = state
        }

        return (
            <Popup {...this.rest}
                prefix="task-detail-popup"
                title={'Задача для ' + partId + ' (' + partName + ')'}>
                {() => <>
                    <div prefix="task-detail-popup__toolbar">
                        <Menu {...stateMenuProps}
                            prefix="task-detail-popup__state-menu"
                            orientation="horizontal"
                            items={stateItems}
                            onChange={this.handleStateChange}/>
                        <div
                            prefix="task-detail-popup__separator"/>
                        <Menu
                            prefix="task-detail-popup__file-menu"
                            orientation="horizontal"
                            items={fileItems}
                            value={constValue}
                            onChange={this.handleFileOpen}/>
                    </div>
                    <div prefix="task-detail-popup__comment">
                        {comment}
                    </div>
                    <Menu {...this.tabBar}
                        prefix="task-detail-popup__tab-bar"
                        orientation="horizontal"
                        items={attachmentItems}
                        value={activeAttachment}
                        onChange={this.handleActiveAttachmentChange}/>
                    <div prefix="task-detail-popup__attachment">
                        {this.renderAttachment()}
                    </div>
                </>}
            </Popup>
        );
    }

    renderAttachment() {
        let {data, dataKey, activeAttachment} = this.own;

        if (typeof dataKey === 'number') {
            if (!data) {
                return null;
            }
    
            if (data === Core.loading) {
                return (
                    <LoadingOverlay prefix="task-detail-popup__loading-overlay"/>
                );
            }

            if (data.length === 0) {
                return this.renderNotFoundOverlay();
            }
        } else {
            return this.renderNotFoundOverlay();
        }

        switch (activeAttachment) {
            case 'operations':
                return (
                    <OperationList {...this.attachment}
                        prefix="task-detail-popup__operation-list"/>
                );
            case 'materials':
                return (
                    <MaterialTable {...this.attachment}
                        prefix="task-detail-popup__material-table"/>
                );
            case 'tools':
                return (
                    <ToolTable {...this.attachment}
                        prefix="task-detail-popup__tool-table"/>
                );
        }
    }

    renderNotFoundOverlay() {
        let {activeAttachment} = this.own;

        return (
            <NotFoundOverlay
                prefix="task-detail-popup__not-found-overlay"
                text={notFoundText[activeAttachment]}/>
        );
    }

    @Core.bind()
    handleAfterRender() {
        let {data, dataKey, activeAttachment} = this.own;

        if (typeof dataKey === 'number' && !data) {
            this.fire('onLoad', {dataKey, activeAttachment});
        }
    }

    @Core.bind()
    handleStateChange(event) {
        let {task} = this.own,
            {value} = event;

        this.fire('onTasksUpdate', {
            values: [Object.assign({}, task, {
                state: value
            })]
        });
    }

    @Core.bind()
    handleActiveAttachmentChange({value}) {
        this.fire('onActiveAttachmentChange', {
            activeAttachment: value
        });
    }

    @Core.bind()
    handleFileOpen(event) {
        let {partId, partName, attachments} = this.own.task,
            {value} = event,
            title;

        switch (value) {
            case 'drawing':
                title = 'Чертеж детали ';
                break;
            case 'assembly':
                title = 'Чертеж сборки ';
                break;
        }

        Popup.open({
            key: 'imageViewer',
            title: title + partId + ' (' + partName + ')',
            src: 'static/' + value + '/' + attachments[value] + '.png',
            component: ImagePopup
        });
    }
}