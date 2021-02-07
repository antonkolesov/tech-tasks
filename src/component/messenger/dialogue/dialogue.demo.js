import Component from 'component';
import Dialogue from './dialogue';
import 'index.scss';

class DialogueDemo extends Component {

    renderComponent() {
        return <>
            <Dialogue/>
        </>
    }
}

Component.render(
    <DialogueDemo/>
);