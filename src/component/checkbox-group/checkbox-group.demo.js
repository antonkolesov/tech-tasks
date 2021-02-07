import Core from 'core';
import Demo from 'demo';
import CheckboxGroup from './checkbox-group';
import 'index.scss';

let items = [{
    key: 'one',
    label: 'One'
}, {
    key: 'two',
    label: 'Two'
}, {
    key: 'three',
    label: 'Three'
}];

Core.render(
    <Demo title="CheckboxGroup">
        <Demo.Item title="Default">
            <CheckboxGroup
                items={items}
                value={['one']}
                onChange={e => {
                    console.log('onChange: ', e)
                }}/>
        </Demo.Item>
    </Demo>
);