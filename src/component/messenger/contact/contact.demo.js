import Component from 'component';
import Contact from './contact';
import 'index.scss';

class ContactDemo extends Component {

    renderComponent() {
        return <>
            <Contact/>
        </>
    }
}

Component.render(
    <ContactDemo/>
);