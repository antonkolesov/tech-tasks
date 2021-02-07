import Core from 'core';
import Types from 'types';
import LoadingOverlay from 'component/loading-overlay';
import SignInPage from 'component/sign-in-page';
import NotFoundPage from 'container/not-found-page';
import TaskPage from 'container/task-page';
import Popup from 'component/popup';
import './viewport.scss';

export default class Viewport extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'account',
            'page',
            'theme',
            'onAccountRead'
        ]
    }, {
        group: 'popupManager',
        component: Popup.Manager,
        include: [
            'onPopupOpen:onOpen',
            'onPopupClose:onClose'
        ]
    })
    @Core.types({
        account: Types.oneOfType([
            Types.object,
            Types.loading
        ]),
        page: Types.string,
        theme: Types.theme,
        onAccountRead: Types.func
    })
    renderComponent() {
        let {account} = this.own;

        if (!account) {
            return null;
        }

        let {theme} = this.own,
            prefix = 'viewport' + (theme ? ' theme--' + theme : '');

        return (
            <div {...this.rest}
                prefix={prefix}>
                {account === Core.loading ? this.renderLoadingOverlay() : this.renderViewport()}
                <Popup.Manager {...this.popupManager}/>
            </div>
        );
    }

    renderLoadingOverlay() {
        return <LoadingOverlay prefix="viewport__loading-overlay"/>;
    }

    renderViewport() {
        let {account, page} = this.own,
            {key} = account;
        
        if (!key && typeof key !== 'number') {
            return <SignInPage prefix="viewport__sign-in-page"/>;
        }

        switch (page) {
            case 'tasks':
                return <TaskPage prefix="viewport__task-page"/>;
            default:
                return <NotFoundPage prefix="viewport__not-found-page"/>;    
        }
    }

    @Core.bind()
    handleAfterRender() {
        let {account} = this.own;

        if (!account) {
            this.fire('onAccountRead', {});
        }
    }
}