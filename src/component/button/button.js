import Core from 'core';
import Types from 'types';
import Icon from 'component/icon';
import './button.scss';

export default class Button extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'mode',
            'title',
            'text'
        ]
    }, {
        group: 'icon',
        include: 'icon:name'
    })
    @Core.defaults({
        mode: 'iconText',
        type: 'button'
    })
    @Core.types({
        disabled: Types.bool,
        mode: Types.oneOf(['icon', 'text', 'iconText']),
        text: Types.any
    })
    renderComponent() {
        let {disabled, mode, title, text} = this.own,
            {name} = this.icon

        return (
            <button {...this.rest}
                prefix="button"
                modifiers={{disabled}}
                title={title || (mode === 'icon' && text) || null}>
                {name && mode !== 'text' && (
                    <Icon {...this.icon}
                        prefix="button__icon"/>
                )}
                {text && mode !== 'icon' && (
                    <div prefix="button__text">
                        {text}
                    </div>
                )}
            </button>
        );
    }
}