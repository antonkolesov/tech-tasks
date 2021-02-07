import Component from 'component';
import DialogueHeader from './dialogue-header';
import 'index.scss';

class DialogueHeaderDemo extends Component {

    renderComponent() {
        return <>
            <DialogueHeader/>
        </>
    }
}

Component.render(
    <DialogueHeaderDemo/>
);