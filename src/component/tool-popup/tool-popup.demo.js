import Core from 'core';
import ToolPopup from './tool-popup';
import 'index.scss';

class ToolPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <ToolPopup/>
        </>
    }
}

Core.render(
    <ToolPopupDemo/>
);