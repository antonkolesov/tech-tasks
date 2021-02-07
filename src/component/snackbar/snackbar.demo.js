import Component from 'component';
import Snackbar from './snackbar';
import 'index.scss';

class SnackbarDemo extends Component {

    renderComponent() {
        return <>
            <Snackbar/>
        </>
    }
}

Component.render(
    <SnackbarDemo/>
);