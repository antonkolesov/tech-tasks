import Core from 'core';
import Popup from 'component/popup';
import Form from 'component/form';
import Label from 'component/label';
import './sign-in-popup.scss';

export default class SignInPopup extends Core.Component {

    @Core.props({
        group: 'form',
        component: Form
    })
    @Core.innerRefs(
        'login'
    )
    renderComponent() {
        return (
            <Popup {...this.rest}
                prefix="sign-in-popup"
                title="Вход"
                closable={false}
                transparent={true}>
                {this.renderForm}
            </Popup>
        );
    }

    @Core.bind()
    renderForm({handleClose}) {
        let {loginRef} = this.innerRefs,
            values = {
                login: '',
                password: '',
                remember: true
            };

        return (
            <Form {...this.form}
                prefix="sign-in-popup__form"
                values={values}
                onValidate={this.handleValidate}
                onComplete={handleClose}>
                <Label
                    prefix="sign-in-popup__login-label"
                    text="Логин:">
                    <Form.TextField
                        prefix="sign-in-popup__login-field"
                        name="login"
                        spellCheck={false}
                        innerRef={loginRef}/>
                </Label>
                <Label
                    prefix="sign-in-popup__password-label"
                    text="Пароль:">
                    <Form.TextField
                        prefix="sign-in-popup__password-field"
                        name="password"
                        type="password"/>
                </Label>
                <Form.Checkbox
                    prefix="sign-in-popup__remember-checkbox"
                    name="remember"
                    label="Запомнить меня"/>
                <Form.Button
                    prefix="sign-in-popup__submit-button"
                    type="submit"
                    text="Войти"/>
            </Form>
        );
    }

    @Core.bind()
    handleValidate(event) {
        let {errors, values} = event;

        if (!values.login) {
            errors.login = 'Это поле должно быть заполнено!';
        }

        if (!values.password) {
            errors.password = 'Это поле должно быть заполнено!';
        }
    }

    @Core.bind()
    handleAfterMount() {
        this.innerRefs.loginEl.querySelector('input').focus();
    }
}