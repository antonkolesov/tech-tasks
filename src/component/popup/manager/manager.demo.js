import Component from 'component';
import Manager from './manager';
import 'index.scss';

class ManagerDemo extends Component {

    renderComponent() {
        return <>
            <Manager/>
        </>
    }
}

Component.render(
    <ManagerDemo/>
);