import Core from 'core';
import Account from 'reducer/account';
import SignInPopup from 'component/sign-in-popup';

export default Core.connect(
    () => {
        return {
            onSubmit: Account.readAccount
        };
    },
    SignInPopup
);