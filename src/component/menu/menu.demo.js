import Core from 'core';
import Demo from 'demo';
import Menu from './menu';
import 'index.scss';

let items = [{
    key: 'one',
    text: 'One'
}, {
    key: 'two',
    text: 'Two',
    items: [{
        key: 'four',
        text: 'Four'
    }, {
        as: '-'
    }, {
        key: 'five',
        text: 'Five'
    }]
}, {
    key: 'three',
    text: 'Three'
}];

Core.render(
    <Demo title="Menu">
        <Demo.Item title="Default">
            <Menu
                items={items}
                value={['one', 'four']}
                onChange={e => {
                    console.log('onChange: ', e);
                }}/>
        </Demo.Item>
        <Demo.Item title="Orientation">
            <Menu
                orientation="vertical"
                items={items}
                value={['one', 'four']}/>
            <Menu
                orientation="horizontal"
                items={items}
                value={['one', 'four']}/>
        </Demo.Item>
    </Demo>
);