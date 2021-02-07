import Core from 'core';
import Types from 'types';
import Input from 'component/input';
import Tooltip from 'component/tooltip';
import Icon from 'component/icon';
import './text-field.scss';

export default class TextField extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'error',
            'multiline',
            'onChange'
        ]
    }, {
        group: 'input',
        component: Input
    })
    @Core.innerRefs(
        'input'
    )
    @Core.types({
        disabled: Types.bool,
        error: Types.string,
        multiline: Types.bool,
        onChange: Types.func
    })
    renderComponent() {
        let {inputRef} = this.innerRefs,
            {disabled, error, multiline} = this.own,
            Type = multiline ? 'textarea' : Input;

        return (
            <div {...this.rest}
                prefix="text-field"
                modifiers={{disabled}}>
                <Type {...this.input}
                    prefix="text-field__input"
                    modifiers={{
                        error: !!error,
                        multiline
                    }}
                    innerRef={inputRef}
                    onChange={this.handleChange}/>
                {error && (
                    <Tooltip
                        trigger={this.renderError}
                        data={error}>
                        {this.renderTooltip}
                    </Tooltip>
                )}
            </div>
        );
    }

    @Core.bind()
    renderError(tooltip) {
        return (
            <Icon {...tooltip}
                prefix="text-field__error"
                name="alert-circle"/>
        );
    }

    @Core.bind()
    renderTooltip(tooltip) {
        let {data} = tooltip;

        return (
            <div prefix="text-field__tooltip">
                {data}
            </div>
        );
    }

    @Core.bind()
    handleChange(event) {
        let {value} = event.target;
        this.fire('onChange', {event, value})
    }
}