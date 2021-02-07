import Component from 'component';
import MessageEditor from './message-editor';
import 'index.scss';

class MessageEditorDemo extends Component {

    renderComponent() {
        return <>
            <MessageEditor/>
        </>
    }
}

Component.render(
    <MessageEditorDemo/>
);