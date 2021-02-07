import Core from 'core';
import Types from 'types';
import Icon from 'component/icon';
import './snackbar.scss';

class Item extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'itemKey',
            'text',
            'onClose'
        ]
    })
    @Core.state(() => ({
        inProp: true
    }))
    @Core.types({
        itemKey: Types.oneOfType([
            Types.string,
            Types.number
        ]),
        text: Types.string,
        onClose: Types.func
    })
    renderComponent() {
        let {text} = this.own,
            {inProp} = this.state;

        return (
            <Core.Transition
                in={inProp}
                timeout={{
                    appear: 0,
                    exit: 120
                }}
                appear={true}
                onExited={this.handleExited}>
                {transition => (
                    <div
                        prefix="snackbar__item"
                        modifiers={{transition}}>
                        <div prefix="snackbar__text">
                            {text}
                        </div>
                        <Icon
                            prefix="snackbar__close"
                            name="close"
                            onClick={this.handleClose}/>
                    </div>
                )}
            </Core.Transition>
        );
    }

    @Core.bind()
    handleClose() {
        this.setState({
            inProp: false
        })
    }

    @Core.bind()
    handleExited() {
        let {itemKey} = this.own
        this.fire('onClose', {itemKey});
    }
}

export default class Snackbar extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'items'
    }, {
        group: 'item',
        include: 'onClose'
    })
    @Core.defaults({
        items: []
    })
    renderComponent() {
        let {items} = this.own;
        return (
            <div {...this.rest}
                prefix="snackbar">
                {items.map(this.renderItem)}
            </div>
        );
    }

    @Core.bind()
    renderItem(item) {
        let {key} = item;

        return (
            <Item {...this.item} {...item}
                itemKey={key}/>
        );
    }
}