import Core from 'core';
import Choice from 'component/choice';
import './checkbox.scss';

export default class Checkbox extends Core.Component {

    renderComponent() {
        return (
            <Choice {...this.rest}
                prefix="checkbox"
                type="checkbox"/>
        );
    }
}