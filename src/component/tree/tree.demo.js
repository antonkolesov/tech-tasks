import Core from 'core';
import Demo from 'demo';
import Tree from './tree';
import 'index.scss';

let items = [{
    key: 'item-1',
    text: 'Item-1'
}, {
    key: 'item-2',
    text: 'Item-2',
    items: [{
        key: 'item-2.1',
        text: 'Item-2.1'
    }, {
        key: 'item-2.2',
        text: 'Item-2.2'
    }]
}, {
    key: 'item-3',
    text: 'Item-3',
    items: [{
        key: 'item-3.1',
        text: 'Item-3.1'
    }, {
        key: 'item-3.2',
        text: 'Item-3.2'
    }]
}];

class TreeDemo extends Core.Component {

    @Core.state(() => ({
        expandedItems: ['item-2'],
        activeItem: 'item-1'
    }))
    renderComponent() {
        return (
            <Tree {...this.state}
                items={items}
                onExpand={({expandedItems}) => {
                    this.setState({expandedItems});
                }}
                onItemClick={({activeItem}) => {
                    this.setState({activeItem});
                }}/>
        );
    }
}

let style = `
    .demo--tree .tree {
        border: 1px solid black;
    }
`

Core.render(
    <Demo
        title="Tree"
        style={style}>
        <Demo.Item title="Default">
            <TreeDemo/>
        </Demo.Item>
    </Demo>
);