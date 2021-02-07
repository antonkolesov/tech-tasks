import Core from 'core';
import Types from 'types';
import './label.scss';

export default class Label extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'align',
            'position',
            'text'
        ]
    })
    @Core.types({
        align: Types.oneOf(['start', 'center', 'end']),
        position: Types.oneOf(['left', 'right', 'top', 'bottom']),
        text: Types.any
    })
    renderComponent() {
        let {align, position, text} = this.own,
            {children} = this.rest;

        return (
            <div {...this.rest}
                prefix="label"
                modifiers={{align, position}}>
                <div prefix="label__text">
                    {text}
                </div>
                <div prefix="label__content">
                    {children}
                </div>
            </div>
        );
    }
}