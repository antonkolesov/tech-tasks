import Core from 'core';
import Types from 'types';
import Icon from 'component/icon';
import './not-found-overlay.scss';

export default class NotFoundOverlay extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'text'
    })
    @Core.defaults({
        text: 'Ничего не найдено!'
    })
    @Core.types({
        text: Types.string
    })
    renderComponent() {
        let {text} = this.own;

        return (
            <div {...this.rest}
                prefix="not-found-overlay">
                <Icon
                    prefix="not-found-overlay__icon"
                    name="database-search"
                    size="large"/>
                <div prefix="not-found-overlay__text">
                    {text}
                </div>
            </div>
        );
    }
}