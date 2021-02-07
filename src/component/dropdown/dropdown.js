import Core from 'core';
import Types from 'types';
import Button from 'component/button'
import Popover from 'component/popover';
import './dropdown.scss';

export default class Dropdown extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'arrow',
            'children'
        ]
    }, {
        group: 'popover',
        prefix: 'popover',
        component: Popover
    })
    @Core.defaults({
        arrow: 'bottom',
        popoverFit: 'trigger'
    })
    @Core.types({
        arrow: Types.oneOfType([
            Types.oneOf(['left', 'right', 'top', 'bottom']),
            Types.bool
        ])
    })
    renderComponent() {
        let {children} = this.own;

        return (
            <Popover {...this.popover}
                prefix="dropdown__popover"
                trigger={this.renderTrigger}>
                {children}
            </Popover>
        );
    }

    @Core.bind()
    renderTrigger(props) {
        let {arrow} = this.own;

        return (
            <Button {...this.rest} {...props}
                prefix="dropdown"
                modifiers={{arrow}}/>
        );
    }
}