import Core from 'core';
import MaterialPopup from './material-popup';
import 'index.scss';

class MaterialPopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <MaterialPopup/>
        </>
    }
}

Core.render(
    <MaterialPopupDemo/>
);