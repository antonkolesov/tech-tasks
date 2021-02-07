import Core from 'core';
import Types from 'types';
import Input from 'component/input';
import './choice.scss';

export default class Choice extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'label',
            'value',
            'onChange'
        ]
    }, {
        group: 'input',
        component: Input
    })
    @Core.types({
        disabled: Types.bool,
        label: Types.string,
        value: Types.bool,
        onChange: Types.func
    })
    renderComponent() {
        let {disabled, label, value} = this.own;

        return (
            <label {...this.rest}
                prefix="choice"
                modifiers={{disabled}}>
                <Input {...this.input}
                    prefix="choice__input"
                    checked={value}
                    onChange={this.handleChange}/>
                <div prefix="choice__label">
                    {label && (
                        <div prefix="choice__label-text">
                            {label}
                        </div>
                    )}
                </div>
            </label>
        );
    }

    @Core.bind()
    handleChange(event) {
        this.fire('onChange', {
            event,
            value: event.target.checked
        });
    }
}