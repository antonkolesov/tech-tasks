import Core from 'core';
import Demo from 'demo';
import SignInPage from './sign-in-page';
import 'index.scss';

class SignInPageDemo extends Core.Component {

    renderComponent() {
        return (
            <SignInPage
                values={{
                    login: '',
                    password: '',
                    remember: true
                }}
                onSubmit={this.handleSubmit}/>
        );
    }

    @Core.bind()
    handleSubmit(event) {
        console.log(event);
        setTimeout(() => {
            event.complete();
        }, 500);
    }
}

Core.render(
    <Demo title="SignInPage">
        <Demo.Item title="Default">
            <SignInPageDemo/>
        </Demo.Item>
    </Demo>
);