import Core from 'core';
import ImagePopup from './image-popup';
import 'index.scss';

class ImagePopupDemo extends Core.Component {

    renderComponent() {
        return <>
            <ImagePopup/>
        </>
    }
}

Core.render(
    <ImagePopupDemo/>
);