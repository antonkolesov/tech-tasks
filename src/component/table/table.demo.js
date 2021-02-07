import Core from 'core';
import Demo from 'demo';
import Table from './table';
import 'index.scss';

let columns = [{
        key: 'one',
        text: 'One',
        sortable: true
    }, {
        key: 'two',
        text: 'Two',
        sortable: true
    }, {
        key: 'three',
        text: 'Three',
        sortable: true
    }],
    data = [{
        one: '1.1',
        two: '2.1',
        three: '3.1'
    }, {
        one: '1.3',
        two: '2.3',
        three: '3.3'
    }, {
        one: '1.2',
        two: '2.2',
        three: '3.2'
    }],
    sort = {
        sort: 'one',
        order: 'asc'
    };

Core.render(
    <Demo title="Table">
        <Demo.Item table="Default">
            <Table
                columns={columns}
                data={data}
                sort={sort}
                innerSort={true}
                onSort={e => {
                    console.log('onSort: ', e);
                }}/>
        </Demo.Item>
    </Demo>
);