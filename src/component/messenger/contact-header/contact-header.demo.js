import Component from 'component';
import ContactHeader from './contact-header';
import 'index.scss';

class ContactHeaderDemo extends Component {

    renderComponent() {
        return <>
            <ContactHeader/>
        </>
    }
}

Component.render(
    <ContactHeaderDemo/>
);