import Core from 'core';
import Demo from 'demo';
import ChoiceGroup from './choice-group';
import Checkbox from 'component/checkbox';
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
    <Demo title="ChoiceGroup">
        <Demo.Item title="Default">
            <ChoiceGroup
                itemComponent={Checkbox}
                items={items}
                value="one"
                onChange={e => {
                    console.log('onChange: ', e)
                }}/>
        </Demo.Item>
        <Demo.Item title="Disabled">
            <ChoiceGroup
                disabled={true}
                itemComponent={Checkbox}
                items={items}
                value="one"/>
        </Demo.Item>
        <Demo.Item title="Orientation">
            <ChoiceGroup
                orientation="vertical"
                itemComponent={Checkbox}
                items={items}
                value="one"/>
            <ChoiceGroup
                orientation="horizontal"
                itemComponent={Checkbox}
                items={items}
                value="one"/>
        </Demo.Item>
        <Demo.Item title="Least">
            <ChoiceGroup
                least={1}
                itemComponent={Checkbox}
                items={items}
                value="one"/>
        </Demo.Item>
    </Demo>
);