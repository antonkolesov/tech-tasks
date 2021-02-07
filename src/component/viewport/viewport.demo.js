import Core from 'core';
import Viewport from './viewport';
import 'index.scss';

class ViewportDemo extends Core.Component {

    renderComponent() {
        return <>
            <Viewport/>
        </>
    }
}

Core.render(
    <ViewportDemo/>
);