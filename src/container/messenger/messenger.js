import Core from 'core';
import App from 'reducer/app';
import Messages from 'reducer/messages';
import Messenger from 'component/messenger';

export default Core.connect(
    (state) => {
        let {account} = state;

        return Object.assign({}, state.messages, {
            account,
            onActiveTabChange: Messages.setActiveTab,
            onClose: App.toggleMessenger,
            onMessagesRead: Messages.readDialogue,
            onContactsRead: Messages.readContacts,
            onGroupChange: Messages.setGroup,
            onFilterChange: Messages.setFilter,
            onMessageChange: Messages.setDraft,
            onMessageSend: Messages.createMessage,
            onSortChange: Messages.setSort
        });
    },
    Messenger
);