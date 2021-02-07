import Component from 'component';
import ContactList from './contact-list';
import 'index.scss';

class ContactListDemo extends Component {

    renderComponent() {
        return <>
            <ContactList/>
        </>
    }
}

Component.render(
    <ContactListDemo/>
);