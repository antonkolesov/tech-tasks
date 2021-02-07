import Core from 'core';
import Account from 'reducer/account';
import App from 'reducer/app';
import Help from 'reducer/help';
import Materials from 'reducer/materials';
import Messages from 'reducer/messages';
import Operations from 'reducer/operations';
import Popups from 'reducer/popups';
import Router from 'reducer/router';
import Tasks from 'reducer/tasks';
import Tools from 'reducer/tools';
import Viewport from 'container/viewport';
import 'index.scss';

let store = Core.createStore({
    Account,
    App,
    Help,
    Materials,
    Messages,
    Operations,
    Popups,
    Router,
    Tasks,
    Tools
});

Core.render(
    <Core.Provider store={store}>
        <Viewport/>
    </Core.Provider>,
    document.querySelector('.root')
);