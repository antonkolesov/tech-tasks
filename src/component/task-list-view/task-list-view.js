import Core from 'core';
import Types from 'types';
import Table from 'component/table';
import Checkbox from 'component/checkbox';
import Popup from 'component/popup';
import TaskDetailPopup from 'container/task-detail-popup';
import './task-list-view.scss';

let columns = [{
        key: 'checkbox'
    }, {
        key: 'partId',
        text: 'Номер',
        sortable: true
    }, {
        key: 'partName',
        text: 'Название',
        sortable: true
    }, {
        key: 'comment',
        text: 'Комментарий',
        sortable: true
    }, {
        key: 'state',
        text: 'Состояние',
        sortable: true
    }, {
        key: 'created',
        text: 'Создано',
        sortable: true
    }],
    stateText = {
        todo: 'Выполнить',
        doing: 'Выполняется',
        done: 'Выполнено'
    };

export default class TaskListView extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'selected',
            'onSelectionChange',
            'onPageChange'
        ]
    })
    @Core.types({
        selected: Types.arrayOf(Types.number),
        onSelectionChange: Types.func,
        onPageChange: Types.func
    })
    renderComponent() {
        return (
            <Table {...this.rest}
                prefix="task-list-view"
                columns={columns}
                infinite={true}
                renderColumn={this.renderColumn}
                renderCell={this.renderCell}
                onRowClick={this.handleRowClick}
                onPageChange={this.handlePageChange}/>
        );
    }

    @Core.bind()
    renderColumn(text, column) {
        let {key} = column,
            {selected} = this.own;

        return key === 'checkbox' ? (
            <div prefix="task-list-view__checkbox-column">
                <Checkbox
                    prefix="task-list-view__checkbox"
                    value={!!selected.length}
                    data-key="all"
                    onClick={this.stopPropagation}
                    onChange={this.handleSelectionChange}/>
            </div>
        ) : (
            text
        );
    }

    @Core.bind()
    renderCell(value, record, column) {
        switch (column.key) {
            case 'checkbox':
                let {selected} = this.own;
                return (
                    <div
                        prefix="task-list-view__checkbox-cell"
                        modifiers={{type: record.type}}>
                        <Checkbox
                            prefix="task-list-view__checkbox"
                            value={selected.includes(record.key)}
                            data-key={record.key + ''}
                            onClick={this.stopPropagation}
                            onChange={this.handleSelectionChange}/>
                    </div>
                );
            case 'state':
                return record.loading ? 'Изменение...' : stateText[value];
            case 'created':
                return Core.formatDate(new Date(value), 'd.m.Y');
            default:
                return value;
        }
    }

    @Core.bind()
    handleRowClick({recordKey}) {
        let {key} = this.rest.data.find(i => i.key === recordKey);
        
        Popup.open({
            key: 'task',
            component: TaskDetailPopup,
            taskKey: key
        });
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    @Core.bind()
    handleSelectionChange({event, value}) {
        let {key} = event.currentTarget.parentNode.dataset,
            {selected} = this.own,
            {data} = this.rest;

        if (key === 'all') {
            if (value) {
                selected = data.map(i => i.key);
            } else {
                selected = [];
            }
        } else {
            key = +key;

            if (value) {
                selected = selected.concat([key]);
            } else {
                selected = selected.filter(i => i !== key);
            }
        }

        this.fire('onSelectionChange', {selected});
    }

    @Core.bind()
    handlePageChange({page}) {
        this.fire('onPageChange', {type: 'list', page});
    }
}