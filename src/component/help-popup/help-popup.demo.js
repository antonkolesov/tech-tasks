import Core from 'core';
import HelpPopup from './help-popup';
import 'index.scss';

class HelpPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <HelpPopup/>
        </>
    }
}

Core.render(
    <HelpPopupDemo/>
);