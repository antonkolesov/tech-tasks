import Core from 'core';
import Table from 'component/table';
import './material-table.scss';

let columns = [{
    key: 'id',
    text: 'Номер',
    sortable: true
}, {
    key: 'name',
    text: 'Название',
    sortable: true
}, {
    key: 'shape',
    text: 'Тип',
    sortable: true
}, {
    key: 'grade',
    text: 'Марка',
    sortable: true
}, {
    key: 'size',
    text: 'Размер',
    sortable: true
}, {
    key: 'amount',
    text: 'Кол-во',
    sortable: true,
    render: record => record.amount + ' ' + record.unit
}];

export default class MaterialTable extends Core.Component {

    renderComponent() {
        return (
            <Table {...this.rest}
                prefix="material-table"
                columns={columns}
                innerSort={true}/>
        );
    }
}