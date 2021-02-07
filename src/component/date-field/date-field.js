import Core from 'core';
import Types from 'types';
import DatePicker from 'component/date-picker';
import Popover from 'component/popover';
import TextField from 'component/text-field';
import './date-field.scss';

export default class DateField extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'format',
            'value',
            'onChange'
        ]
    }, {
        group: 'popover',
        prefix: 'popover',
        component: Popover
    })
    @Core.defaults({
        format: 'd.m.Y'
    })
    @Core.types({
        format: Types.string,
        value: Types.instanceOf(Date),
        onChange: Types.func
    })
    renderComponent() {
        let {value} = this.own;

        return (
            <Popover {...this.popover}
                trigger={this.renderTrigger}
                onRequestClose={this.handleRequestClose}>
                <DatePicker {...this.picker}
                    prefix="date-field__picker"
                    value={value}
                    onChange={this.handlePickerChange}/>
            </Popover>
        );
    }

    @Core.bind()
    renderTrigger(popover) {
        let {format, value} = this.own;

        return (
            <TextField {...this.rest} {...popover}
                prefix="date-field"
                readOnly={true}
                value={Core.formatDate(value, format)}/>
        )
    }

    @Core.bind()
    handleRequestClose() {
        if (this.requestClose) {
            this.requestClose = false;
            return true;
        }
    }

    @Core.bind()
    handlePickerChange(event) {
        this.requestClose = true;
        this.fire('onChange', event);
    }
}