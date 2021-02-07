import Core from 'core';
import Form from 'component/form';
import Dropdown from 'component/dropdown';
import Label from 'component/label';
import './task-filter-form.scss';

let fieldItems = [{
        key: 'partId',
        label: 'Номер'
    }, {
        key: 'partName',
        label: 'Название'
    }, {
        key: 'comment',
        label: 'Комментарий'
    }],
    typeItems = [{
        key: 'create',
        label: 'Создать'
    }, {
        key: 'update',
        label: 'Изменить'
    }, {
        key: 'destroy',
        label: 'Удалить'
    }],
    stateItems = [{
        key: 'todo',
        label: 'Выполнить'
    }, {
        key: 'doing',
        label: 'Выполняется'
    }, {
        key: 'done',
        label: 'Выполнено'
    }];

export default class TaskFilterForm extends Core.Component {

    @Core.innerRefs(
        'field'
    )
    renderComponent() {
        let {fieldRef} = this.innerRefs;

        return (
            <Form {...this.rest}
                prefix="task-filter-form"
                stateless={true}>
                <Label
                    prefix="task-filter-form__text-label"
                    text="Текст:">
                    <div prefix="task-filter-form__text-container">
                        <Dropdown
                            prefix="task-filter-form__text-dropdown"
                            arrow={null}
                            icon="tune"
                            popoverFit={fieldRef}>
                            <div prefix="task-filter-form__text-menu">
                                <Form.CheckboxGroup
                                    name="fields"
                                    items={fieldItems}
                                    least={1}/>
                                <div
                                    prefix="task-filter-form__divider"/>
                                <Form.Checkbox
                                    name="caseSensetive"
                                    label="Учитывать регистр"/>
                            </div>
                        </Dropdown>
                        <Form.TextField
                            prefix="task-filter-form__text-field"
                            name="text"
                            spellCheck={false}
                            innerRef={fieldRef}/>
                    </div>
                </Label>
                <Label
                    prefix="task-filter-form__type-label"
                    text="Тип задачи:">
                    <Form.CheckboxGroup
                        name="types"
                        items={typeItems}
                        least={1}/>
                </Label>
                <Label
                    prefix="task-filter-form__state-label"
                    text="Состояние задачи:">
                    <Form.CheckboxGroup
                        name="states"
                        items={stateItems}
                        least={1}/>
                </Label>
            </Form>
        );
    }
}