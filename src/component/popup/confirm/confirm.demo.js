import Component from 'component';
import Confirm from './confirm';
import 'index.scss';

class ConfirmDemo extends Component {

    renderComponent() {
        return <>
            <Confirm/>
        </>
    }
}

Component.render(
    <ConfirmDemo/>
);