import Core from 'core';
import Snackbar from 'component/snackbar';
import Popup from 'component/popup';
import SignInPopup from 'container/sign-in-popup';
import './sign-in-page.scss';

let messages = [{
        key: 'login',
        text: 'Логин: user'
    }, {
        key: 'passowrd',
        text: 'Пароль: user'
    }],
    timeout = 1000;

export default class SignInPage extends Core.Component {

    @Core.state(() => ({
        messages: []
    }))
    renderComponent() {
        let {messages} = this.state;

        return (
            <div {...this.rest}
                prefix="sign-in-page">
                <Snackbar
                    prefix="sign-in-page__snackbar"
                    items={messages}
                    onClose={this.handleRemoveMessage}/>
            </div>
        );
    }

    @Core.bind()
    handleRemoveMessage({itemKey}) {
        this.removeMessage(itemKey);
    }

    @Core.bind()
    handleAfterMount() {
        Popup.open({
            key: 'sign-in',
            component: SignInPopup
        });

        setTimeout(() => {
            this.addMessage(messages[0]);

            setTimeout(() => {
                this.addMessage(messages[1]);
            }, timeout)
        }, timeout);
    }

    addMessage(message) {
        let {messages} = this.state;

        this.setState({
            messages: messages.concat(message)
        })
    }

    removeMessage(key) {
        let {messages} = this.state;

        this.setState({
            messages: messages.filter(i => i.key !== key)
        });
    }
}