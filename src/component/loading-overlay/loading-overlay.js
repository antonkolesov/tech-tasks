import Core from 'core';
import Icon from 'component/icon';
import './loading-overlay.scss';

export default class LoadingOverlay extends Core.Component {

    renderComponent() {
        return (
            <div {...this.rest}
                prefix="loading-overlay">
                <Icon
                    prefix="loading-overlay__icon"
                    name="loading"
                    size="large"/>
            </div>
        );
    }
}