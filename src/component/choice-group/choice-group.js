import Core from 'core';
import Types from 'types';
import './choice-group.scss';

export default class ChoiceGroup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'itemComponent',
            'items',
            'least',
            'orientation',
            'value',
            'onChange'
        ]
    })
    @Core.defaults({
        items: [],
        value: [],
        least: 0
    })
    @Core.types({
        disabled: Types.bool,
        itemComponent: Types.elementType,
        items: Types.any,
        least: Types.number,
        orientation: Types.oneOf(['horizontal', 'vertical']),
        value: Types.any,
        onChange: Types.func
    })
    renderComponent() {
        let {own} = this,
            {disabled, orientation, items} = own;

        own.value = Core.toArray(own.value);

        return (
            <div {...this.rest}
                prefix="choice-group"
                modifiers={{disabled, orientation}}>
                {Core.toArray(items).map(this.renderItem)}
            </div>
        );
    }

    @Core.bind()
    renderItem(item) {
        let {itemComponent: Item, disabled, least, value} = this.own,
            {disabled: itemDisabled, key} = item,
            checked = value.includes(key);

        if (disabled) {
            itemDisabled === false;
        } else {
            itemDisabled = itemDisabled || (checked && value.length <= least);
        }

        return (
            <Item {...item}
                disabled={itemDisabled}
                value={checked}
                name={key}
                onChange={this.handleChange}/>
        );
    }

    @Core.bind()
    handleChange(data) {
        let {event, value} = data,
            {name} = event.target;
        
        this.fire('onChange', {event, name, value});
    }
}