import Core from 'core';
import Types from 'types';
import Button from 'component/button';
import Dropdown from 'component/dropdown';
import './menu.scss';

export default class Menu extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'items',
            'mode',
            'orientation',
            'submenuPrefix',
            'value',
            'onChange',
            'onRequestClose'
        ]
    })
    @Core.defaults({
        items: []
    })
    @Core.types({
        disabled: Types.bool,
        items: Types.array,
        mode: Types.oneOf(['icon', 'text', 'iconText']),
        orientation: Types.oneOf(['horizontal', 'vertical']),
        submenuPrefix: Types.string,
        value: Types.any
    })
    renderComponent() {
        let {own} = this,
            {disabled, items, orientation} = own;

        own.value = Core.toArray(own.value);

        return (
            <div {...this.rest}
                prefix="menu"
                modifiers={{disabled, orientation}}>
                {items.map(this.renderItem)}
            </div>
        );
    }

    @Core.bind()
    renderItem(item, index) {
        if (!item) return;
        
        let {as: As, items, inline, submenuMode, ...rest} = item,
            {key} = rest,
            {mode, value, orientation, submenuPrefix} = this.own,
            disabled = !this.own.disabled && value.includes(key);

        if (!key) {
            key = rest.key = index;
        }

        if (As === '-') {
            return (
                <div {...rest}
                    prefix="menu__separator"/>
            ); 
        } else if (As === '|') {
            return (
                <div {...rest}
                    prefix="menu__divider"/>
            );
        } else if (As) {
            return (
                <As {...rest}/>
            );
        }

        if (inline) {
            return (
                <Menu {...rest}
                    items={items}
                    disabled={this.own.disabled}
                    orientation={orientation}
                    value={value}
                    onChange={this.handleMenuChange}/>
            );
        }

        if (items) {
            let props = {};

            if (orientation !== 'horizontal') {
                props.popoverPosition = 'right-start';
                props.arrow = 'right'
            }

            return (
                <Dropdown {...rest} {...props}
                    prefix="menu__item"
                    disabled={disabled}
                    onPopoverRequestClose={this.handleRequestClose}
                    mode={mode}>
                    <Menu
                        prefix={'menu__submenu' + (submenuPrefix ? (' ' + submenuPrefix) : '')}
                        items={items}
                        value={value}
                        mode={submenuMode}
                        onChange={this.handleMenuChange}/>
                </Dropdown>
            );
        } else {
            return (
                <Button {...rest}
                    prefix="menu__item"
                    disabled={disabled}
                    data-value={key}
                    onClick={this.handleItemClick}
                    mode={mode}/>
            );
        }
    }

    @Core.bind()
    handleItemClick(event) {
        let {value} = event.currentTarget.dataset;
        this.fire('onChange', {event, value});
    }

    @Core.bind()
    handleMenuChange(event) {
        this.requestClose = true;
        this.fire('onChange', event);
    }

    @Core.bind()
    handleRequestClose(event) {
        if (this.requestClose || this.fire('onRequestClose', event)) {
            this.requestClose = false;
            return true;
        }
    }
}