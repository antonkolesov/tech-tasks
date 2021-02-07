import Core from 'core';
import Account from 'reducer/account';
import Popups from 'reducer/popups';
import Viewport from 'component/viewport';

export default Core.connect(
    state => {
        let {account, popups} = state,
            {page} = state.router,
            {theme} = state.app;

        return {
            account,
            page,
            popups,
            theme,
            onAccountRead: Account.readAccount,
            onPopupOpen: Popups.openPopup,
            onPopupClose: Popups.closePopup
        };
    },
    Viewport
);

