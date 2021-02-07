import Component from 'component';
import ContactFilter from './contact-filter';
import 'index.scss';

class ContactFilterDemo extends Component {

    renderComponent() {
        return <>
            <ContactFilter/>
        </>
    }
}

Component.render(
    <ContactFilterDemo/>
);