import Core from 'core';
import Choice from 'component/choice';
import './radio.scss';

export default class Radio extends Core.Component {

    renderComponent() {
        return (
            <Choice {...this.rest}
                prefix="radio"
                type="radio"/>
        );
    }
}