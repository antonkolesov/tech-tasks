import Component from 'component';
import SignInPopup from './sign-in-popup';
import 'index.scss';

class SignInPopupDemo extends Component {

    renderComponent() {
        return <>
            <SignInPopup/>
        </>
    }
}

Component.render(
    <SignInPopupDemo/>
);