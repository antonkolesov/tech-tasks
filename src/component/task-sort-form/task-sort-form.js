import Core from 'core';
import Form from 'component/form';
import Label from 'component/label';
import './task-sort-form.scss';

let sortItems = [{
        key: 'partId',
        label: 'Номеру детали'
    }, {
        key: 'partName',
        label: 'Названию детали'
    }, {
        key: 'type',
        label: 'Типу задачи'
    }, {
        key: 'state',
        label: 'Состоянию задачи'
    }, {
        key: 'created',
        label: 'Дате создания'
    }, {
        key: 'comment',
        label: 'Комментарию'
    }],
    orderItems = [{
        key: 'asc',
        label: 'По возрастанию'
    }, {
        key: 'desc',
        label: 'По убыванию'
    }];

export default class TaskSortForm extends Core.Component {

    renderComponent() {
        return (
            <Form {...this.rest}
                prefix="task-sort-form"
                stateless={true}>
                <Label
                    prefix="task-sort-form__sort-label"
                    text="Сортировать по:">
                    <Form.RadioGroup
                        name="sort"
                        items={sortItems}/>
                </Label>
                <Label
                    prefix="task-sort-form__order-label"
                    text="Порядок сортировки:">
                    <Form.RadioGroup
                        name="order"
                        items={orderItems}/>
                </Label>
            </Form>
        );
    }
}