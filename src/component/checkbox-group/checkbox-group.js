import Core from 'core';
import Types from 'types';
import ChoiceGroup from 'component/choice-group';
import Checkbox from 'component/checkbox';
import './checkbox-group.scss';

export default class CheckboxGroup extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'onChange'
    })
    @Core.types({
        onChange: Types.func
    })
    renderComponent() {
        return (
            <ChoiceGroup {...this.rest}
                prefix="checkbox-group"
                itemComponent={Checkbox}
                onChange={this.handleChange}/>
        );
    }

    @Core.bind()
    handleChange(data) {
        let {value} = this.rest;
        
        if (data.value) {
            value = value.concat([data.name]);
        } else {
            value = value.filter(i => i !== data.name);
        }

        this.fire("onChange", {event, value});
    }
}