import Component from 'component';
import DialogueTab from './dialogue-tab';
import 'index.scss';

class DialogueTabDemo extends Component {

    renderComponent() {
        return <>
            <DialogueTab/>
        </>
    }
}

Component.render(
    <DialogueTabDemo/>
);