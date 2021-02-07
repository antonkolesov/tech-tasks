import Core from 'core';
import Types from 'types';
import ChoiceGroup from 'component/choice-group';
import Radio from 'component/radio';
import './radio-group.scss';

export default class RadioGroup extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'value'
    })
    @Core.types({
        value: Types.oneOfType([
            Types.string,
            Types.number
        ])
    })
    renderComponent() {
        let {value} = this.own;

        return (
            <ChoiceGroup {...this.rest}
                prefix="radio-group"
                itemComponent={Radio}
                value={[value]}
                onChange={this.handleChange}/>
        );
    }

    @Core.bind()
    handleChange(data) {
        let {event, name, value} = data;
        if (value) {
            this.fire('onChange', {event, value: name});
        }
    }
}