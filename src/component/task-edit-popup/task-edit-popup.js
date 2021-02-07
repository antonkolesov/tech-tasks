import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Form from 'component/form';
import Label from 'component/label';
import './task-edit-popup.scss';

let typeItems = [{
        key: 'create',
        text: 'Создать'
    }, {
        key: 'update',
        text: 'Изменить'
    }, {
        key: 'destroy',
        text: 'Удалить'
    }],
    stateItems = [{
        key: 'todo',
        text: 'Выполнить'
    }, {
        key: 'doing',
        text: 'Выполняется'
    }, {
        key: 'done',
        text: 'Выполнено'
    }];

export default class TaskEditPopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'confirm',
            'tasks',
            'onSubmit',
            'onConfirmChange'
        ]
    }, {
        group: 'form',
        component: Form
    })
    @Core.defaults({
        resize: ['left', 'right'],
        tasks: []
    })
    @Core.types({
        confirm: Types.bool,
        tasks: Types.arrayOf(Types.task),
        onSubmit: Types.func,
        onConfirmChange: Types.func
    })
    renderComponent() {
        let {tasks} = this.own,
            title = 'Редактировать задач' + (tasks.length > 1 ? 'и' : 'у') + ' для ' + tasks.map(i => i.partId).join(', ');

        return (
            <Popup {...this.rest}
                prefix="task-edit-popup"
                title={title}>
                {this.renderForm}
            </Popup>
        );
    }

    @Core.bind()
    renderForm({handleClose}) {
        let {tasks} = this.own,
            {type, state, comment} = tasks[0] || {};
        
        for (let i = 1; i < tasks.length; i++) {
            let task = tasks[i];

            if (type !== task.type) {
                type = null;
            }

            if (state !== task.state) {
                state = null;
            }

            if (comment !== task.comment) {
                comment = null;
            }
        }

        this.handleClose = handleClose;

        return (
            <Form {...this.form}
                prefix="task-edit-popup__form"
                values={{type, state, comment}}
                onComplete={handleClose}
                onSubmit={this.handleSubmit}>
                <Label
                    prefix="task-edit-popup__type-label"
                    text="Тип задачи:">
                    <Form.Menu
                        prefix="task-edit-popup__type-menu"
                        name="type"
                        orientation="horizontal"
                        items={typeItems}/>
                </Label>
                <Label
                    prefix="task-edit-popup__state-label"
                    text="Состояние задачи:">
                    <Form.Menu
                        prefix="task-edit-popup__state-menu"
                        name="state"
                        orientation="horizontal"
                        items={stateItems}/>
                </Label>
                <Label
                    prefix="task-edit-popup__comment-label"
                    text="Комментарий:">
                    <Form.TextField
                        prefix="task-edit-popup__comment-field"
                        name="comment"
                        multiline={true}
                        placeholder={comment === null ? 'Различные' : null}/>
                </Label>
                <Form.Button
                    prefix="task-edit-popup__submit-button"
                    type="submit"
                    text="Изменить"/>
            </Form>
        );
    }

    @Core.bind()
    handleSubmit(event) {
        let {confirm} = this.own;

        this.submitEvent = event;

        let tasks = this.getUpdatedTasks();

        if (tasks.length) {
            if (confirm) {
                let char = tasks.length > 1 ? 'и' : 'у';
    
                Popup.open({
                    key: 'edit-confirm',
                    type: 'confirm',
                    title: 'Изменить задач' + char + '?',
                    text: 'Вы действительно хотите изменить эт' + char + ' задач' + char + '?',
                    onCheckboxChange: this.handleCheckboxChange,
                    onConfirm: this.handleConfirm,
                    onReject: this.handleReject
                });
            } else {
                this.fire('onSubmit', Object.assign(this.submitEvent, {
                    values: tasks
                }));
            }
        } else {
            this.handleClose();
        }
    }

    @Core.bind()
    handleCheckboxChange(event) {
        this.fire('onConfirmChange', {confirm: !event.value});
    }

    @Core.bind()
    handleConfirm() {
        this.fire('onSubmit', Object.assign(this.submitEvent, {
            values: this.getUpdatedTasks()
        }));
    }

    @Core.bind()
    handleReject() {
        this.submitEvent.reject();
    }

    getUpdatedTasks() {
        let {values} = this.submitEvent,
            {tasks} = this.own,
            newValues = {};

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null) {
                newValues[key] = value;
            }
        });

        let entries = Object.entries(newValues);

        if (entries.length) {
            tasks = tasks.filter(i => {
                for (let j = 0; j < entries.length; j++) {
                    if (entries[j][1] !== i[entries[j][0]]) {
                        return true;
                    }
                }
                return false;
            }).map(i => Object.assign({}, i, newValues));
        } else {
            tasks = [];
        }

        return tasks;
    }
}