import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Form from 'component/form';
import Label from 'component/label';
import './task-add-popup.scss';

let typeItems = [{
    key: 'create',
    text: 'Создать'
}, {
    key: 'update',
    text: 'Изменить'
}, {
    key: 'destroy',
    text: 'Удалить'
}];

export default class TaskAddPopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'confirm',
            'onConfirmChange'
        ]
    }, {
        group: 'form',
        component: Form
    })
    @Core.defaults({
        resize: ['left', 'right']
    })
    @Core.innerRefs(
        'partIdField'
    )
    @Core.types({
        confirm: Types.bool,
        onConfirmChange: Types.func
    })
    renderComponent() {
        return (
            <Popup {...this.rest}
                prefix="task-add-popup"
                title="Добавить задачу">
                {this.renderForm}
            </Popup>
        );
    }

    @Core.bind()
    renderForm({handleClose}) {
        let {partIdFieldRef} = this.innerRefs,
            values = {
                partId: '',
                type: 'create',
                comment: '',
                created: new Date()
            };

        this.handleClose = handleClose;

        return (
            <Form {...this.form}
                prefix="task-add-popup__form"
                values={values}
                onValidate={this.handleValidate}
                onComplete={this.handleComplete}
                onSubmit={this.handleSubmit}>
                <Label
                    prefix="task-add-popup__part-id-label"
                    text="Номер детали:">
                    <Form.TextField
                        prefix="task-add-popup__part-id-field"
                        name="partId"
                        spellCheck={false}
                        inputRef={partIdFieldRef}/>
                </Label>
                <Label
                    prefix="task-add-popup__created-label"
                    text="Дата создания:">
                        <Form.DateField
                            prefix="task-add-popup__created-field"
                            name="created"/>
                    </Label>
                <Label
                    prefix="task-add-popup__type-label"
                    text="Тип задачи:">
                    <Form.Menu
                        prefix="task-add-popup__type-menu"
                        name="type"
                        orientation="horizontal"
                        items={typeItems}/>
                </Label>
                <Label
                    prefix="task-add-popup__comment-label"
                    text="Комментарий:">
                    <Form.TextField
                        prefix="task-add-popup__comment-field"
                        name="comment"
                        multiline={true}
                        rows={4}/>
                </Label>
                <Form.Button
                    prefix="task-add-popup__submit-button"
                    type="submit"
                    text="Создать"/>
            </Form>
        );
    }

    @Core.bind()
    handleValidate(event) {
        let {errors, values} = event;

        if (!values.partId) {
            errors.partId = 'Это поле должно быть заполнено!';
        }
    }

    @Core.bind()
    handleComplete() {
        this.handleClose();
    }

    @Core.bind()
    handleSubmit(event) {
        let {confirm} = this.own;

        this.submitEvent = event;

        if (confirm) {
            Popup.open({
                key: 'a',
                title: 'Добавить задачу?',
                text: 'Вы действительно хотите добавить эту задачу?',
                type: 'confirm',
                onCheckboxChange: this.handleChange,
                onConfirm: this.handleConfirm,
                onReject: this.handleReject
            });
        } else {
            this.fire('onSubmit', event);
        }
    }

    @Core.bind()
    handleChange(event) {
        this.fire('onConfirmChange', {confirm: !event.value});
    }

    @Core.bind()
    handleConfirm() {
        this.fire('onSubmit', this.submitEvent);
    }

    @Core.bind()
    handleReject() {
        this.submitEvent.reject();
    }

    @Core.bind()
    handleAfterMount() {
        this.innerRefs.partIdFieldEl.focus();
    }
}