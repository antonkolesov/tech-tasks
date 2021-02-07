import Core from 'core';
import OperationPopup from './operation-popup';
import 'index.scss';

class OperationPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <OperationPopup/>
        </>
    }
}

Core.render(
    <OperationPopupDemo/>
);