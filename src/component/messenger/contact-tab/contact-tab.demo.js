import Component from 'component';
import ContactTab from './contact-tab';
import 'index.scss';

class ContactTabDemo extends Component {

    renderComponent() {
        return <>
            <ContactTab/>
        </>
    }
}

Component.render(
    <ContactTabDemo/>
);