import Core from 'core';
import Types from 'types';
import './input.scss';

export default class Input extends Core.Component {

    @Core.props({
        group: 'rest',
        include: [
            'autoFocus',
            'checked',
            'name',
            'placeholder',
            'readOnly',
            'rows',
            'spellCheck',
            'type',
            'value'
        ]
    })
    @Core.types({
        autoFocus: Types.bool,
        checked: Types.bool,
        name: Types.string,
        placeholder: Types.string,
        rows: Types.number,
        type: Types.string,
        value: Types.any
    })
    renderComponent() {
        return (
            <input {...this.rest}
                prefix="input"/>
        );
    }
}