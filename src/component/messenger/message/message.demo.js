import Component from 'component';
import Message from './message';
import 'index.scss';

class MessageDemo extends Component {

    renderComponent() {
        return <>
            <Message/>
        </>
    }
}

Component.render(
    <MessageDemo/>
);