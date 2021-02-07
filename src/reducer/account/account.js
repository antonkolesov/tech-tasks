import Core from 'core';
import Data from 'data';

export default class Account {

    static prefix() {
        return 'Account';
    }

    static defaults() {
        let account = localStorage.getItem('account');

        if (account) {
            account = JSON.parse(account);
        }

        return account;
    }

    @Core.async()
    static readAccount({values, complete, reject}) {
        if (!values) {
            Account.setAccount({
                account: Core.loading
            });
        }

        Data.fetch('Account:read', values).then(
            account => {
                Account.setAccount({account, save: true});
                complete && complete();
            },
            errors => {
                reject && reject({errors})
            }
        );
    }

    @Core.async()
    static updateAccount({values}) {
        Data.fetch('Account:update', values).then(
            account => {
                Account.setAccount({account, save: true})
            }
        );
    }

    @Core.dispatch()
    static setAccount({state, account, save}) {
        if (save) {
            localStorage.setItem('account', JSON.stringify(account));
        }

        return state.set('account', account);
    }
}