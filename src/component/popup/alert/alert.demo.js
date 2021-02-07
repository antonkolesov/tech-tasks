import Component from 'component';
import Alert from './alert';
import 'index.scss';

class AlertDemo extends Component {

    renderComponent() {
        return <>
            <Alert/>
        </>
    }
}

Component.render(
    <AlertDemo/>
);