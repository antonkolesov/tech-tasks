import Core from 'core';
import Popup from 'component/popup';
import Icon from 'component/icon';
import './about-popup.scss';

export default class AboutPopup extends Core.Component {

    renderComponent() {
        return (
            <Popup {...this.rest}
                prefix="about-popup"
                title="О программе">
                <Icon
                    prefix="about-popup__icon"
                    name="rabbit"
                    size="5x"/>
                <div prefix="about-popup__name">
                    Обычная программа (0.0.0)
                </div>
                <div prefix="about-popup__comment">
                    Надеюсь, вам понравится.
                </div>
                <a
                    prefix="about-popup__mail"
                    href="mailto:kolesov@outlook.com">
                    kolesov@outlook.com
                </a>
            </Popup>
        );
    }
}