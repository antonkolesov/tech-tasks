import Core from 'core';
import Types from 'types';
import './tree.scss';

export default class Tree extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'items',
            'expandedItems',
            'activeItem',
            'onExpand',
            'onChange'
        ]
    })
    @Core.defaults({
        expandedItems: []
    })
    @Core.types({
        items: Types.array,
        expandedItems: Types.array,
        activeItem: Types.oneOfType([
            Types.string,
            Types.number
        ]),
        onExpand: Types.func,
        onChange: Types.func
    })
    renderComponent() {
        let {items} = this.own;

        return (
            <div {...this.rest}
                prefix="tree"
                onClick={this.handleClick}>
                {this.renderItems(items, 0)}
            </div>
        );
    }

    renderItems(items, level) {
        let {expandedItems, activeItem} = this.own,
            indent;

        if (level) {
            indent = [];

            for (let i = 0; i < level; i++) {
                indent[i] = (
                    <div
                        prefix="tree__indent"
                        key={'i' + i}/>
                );
            }
        }

        return items.map(i => {
            let {key, text, items, ...rest} = i,
                type = items ? (expandedItems.includes(key) ? 'expanded' : 'collapsed') : 'none';

            return (
                <Core.Fragment key={key}>
                    <div {...rest}
                        prefix="tree__item"
                        modifiers={{
                            active: activeItem === key
                        }}
                        data-key={(items ? 'b' : 'l') + ':' + key}>
                        {indent}
                        <div
                            prefix="tree__icon"
                            modifiers={{[type]: true}}/>
                        {text}
                    </div>
                    {items && type === 'expanded' && (
                        <div prefix="tree__group">
                            {this.renderItems(items, level + 1)}
                        </div>
                    )}
                </Core.Fragment>
            );
        });
    }

    @Core.bind()
    handleClick(event) {
        let [type, key] = (event.target.dataset.key || '').split(':'),
            {expandedItems} = this.own;
        
        if (key ) {
            switch (type) {
                case 'b':
                    if (expandedItems.includes(key)) {
                        expandedItems = expandedItems.filter(i => i !== key);
                    } else {
                        expandedItems = expandedItems.concat([key]);
                    }
                    this.fire('onExpand', {expandedItems});
                    break;
                case 'l':
                    this.fire('onChange', {activeItem: key});
                    break;
            }
        }
    }
}