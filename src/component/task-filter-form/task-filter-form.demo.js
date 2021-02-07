import Core from 'core';
import Demo from 'demo';
import TaskFilterForm from './task-filter-form';
import 'index.scss';

let style = `
    .demo--task-filter-form .task-filter-form {
        width: 250px;
    }
`

Core.render(
    <Demo
        title="TaskFilterForm"
        style={style}>
        <Demo.Item title="Default">
            <TaskFilterForm
                values={{
                    fields: ['partId'],
                    caseSensetive: true,
                    text: 'TextValue',
                    types: ['create'],
                    states: ['todo']
                }}
                onChange={(...args) => console.log('onChange:', ...args)}/>
        </Demo.Item>
    </Demo>
);