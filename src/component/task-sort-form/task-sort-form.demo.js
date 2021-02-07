import Core from 'core';
import Demo from 'demo';
import TaskSortForm from './task-sort-form';
import 'index.scss';

Core.render(
    <Demo title="TaskSortForm">
        <Demo.Item title="Default">
            <TaskSortForm
                values={{
                    sort: 'partId',
                    order: 'asc'
                }}
                onChange={(...args) => console.log('onChange:', ...args)}/>
        </Demo.Item>
    </Demo>
);