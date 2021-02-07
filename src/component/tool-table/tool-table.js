import Core from 'core';
import Table from 'component/table';
import './tool-table.scss';

let columns = [{
    key: 'id',
    text: 'Номер',
    sortable: true
}, {
    key: 'name',
    text: 'Название',
    sortable: true
}, {
    key: 'grade',
    text: 'Обозначение',
    sortable: true
}, {
    key: 'count',
    text: 'Кол-во',
    sortable: true,
    render: record => record.count + ' ' + record.unit
}];

export default class ToolTable extends Core.Component {

    renderComponent() {
        return (
            <Table {...this.rest}
                prefix="tool-table"
                columns={columns}
                innerSort={true}/>
        );
    }
}