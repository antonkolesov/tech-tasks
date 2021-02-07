import Core from 'core';
import Demo from 'demo';
import RadioGroup from './radio-group';
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
    <Demo title="RadioGroup">
        <Demo.Item title="Default">
            <RadioGroup
                items={items}
                value="one"
                onChange={e => {
                    console.log('onChange: ', e);
                }}/>
        </Demo.Item>
    </Demo>
);