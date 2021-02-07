import Core from 'core';
import Data from 'data';

export default class Messages {

    static prefix() {
        return 'Messages';
    }

    static defaults() {
        return {
            notifications: [],
            dialogues: {},
            drafts: {},
            activeDialogue: null,
            contacts: null,
            activeTab: 'contacts',
            filter: '',
            sort: {
                sort: 'lastName',
                order: 'asc'
            },
            group: 'department'
        };
    }

    @Core.async()
    static readContacts({state}) {
        if (!state.messages.contacts) {
            Messages.setContacts({
                contacts: Core.loading
            });
    
            Data.fetch('Contacts:read', Messages.receiveMessage).then(
                contacts => Messages.setContacts({contacts})
            );
        }
    }

    @Core.async()
    static readDialogue({key}) {
        Messages.setDialogue({
            key,
            dialogue: Core.loading
        });

        Data.fetch('Dialogues:read', key).then(
            dialogue => Messages.setDialogue({key, dialogue})
        );
    }

    @Core.async()
    static createMessage({message}) {
        let key = Math.random() + '-' + Date.now();

        Messages.addMessage({
            message: Object.assign({}, message, {
                key,
                sended: Core.loading
            }),
            resetDraft: true
        });

        Data.fetch('Message:create', message).then(
            message => Messages.replaceMessage({message, key})
        );
    }

    @Core.dispatch()
    static addMessage({state, message, resetDraft}) {
        let {key} = state.account,
            {from, to} = message;

        key = key === from ? to : from;

        let dialogue = state.messages.dialogues[key];

        if (Array.isArray(dialogue)) {
            state = state.setIn(
                ['messages', 'dialogues', key],
                dialogue.concat(message)
            )
        }

        if (resetDraft) {
            state = state.setIn(['messages', 'drafts', key], '');
        }

        return state;
    }

    @Core.dispatch()
    static replaceMessage({state, key, message}) {
        let {key: accountKey} = state.account,
            {from, to} = message,
            dialogueKey = accountKey === from ? to : from,
            dialogue = state.messages.dialogues[dialogueKey];

        key || (key = message.key);

        return state.setIn(
            ['messages', 'dialogues', dialogueKey],
            dialogue.map(i => i.key === key ? message : i)
        );
    }

    @Core.dispatch()
    static setContacts({state, contacts}) {
        if (Array.isArray(contacts)) {
            let {activeDialogue, activeTab} = state.messages,
                {right: collapsed} = state.app.collapsed;

            if (!collapsed && activeTab === 'dialogue') {
                contacts = contacts.map(i => (
                    (i.unread && i.key === activeDialogue) ? Object.assign({}, i, {
                        unread: false
                    }) : i
                ));
            }
        }
        
        return state.setIn(['messages', 'contacts'], contacts);
    }

    @Core.dispatch()
    static replaceContact({state, key, contact}) {
        let {contacts} = state.messages;

        key = key === undefined ? contact.key : key;
        contacts = contacts.map(i => i.key === key ? contact : i);

        return Messages.pureSetContacts({state, contacts});
    }

    @Core.dispatch()
    static receiveMessage({state, message}) {
        let contact = Object.assign(
            {},
            state.messages.contacts.find(i => i.key === message.from),
            {unread: true}
        );

        state = Messages.pureAddMessage({state, message});
        state = Messages.pureReplaceContact({state, contact});

        return state;
    }

    @Core.dispatch()
    static setDialogue({state, key, dialogue}) {
        return state.setIn(['messages', 'dialogues', key], dialogue);
    }

    @Core.dispatch()
    static setActiveTab({state, activeTab, contact}) {
        let {right: collapsed} = state.app.collapsed,
            props = {activeTab};

        if (collapsed) {
            state = Core.getReducer('App').pureToggleMessenger({state});
        }

        if (activeTab === 'dialogue' && contact) {
            props.activeDialogue = contact.key;
    
            if (contact.unread) {
                contact = Object.assign({}, contact, {
                    unread: false
                });
    
                state = Messages.pureReplaceContact({state, contact})
            }
        }

        return state.set('messages', state.messages.merge(props));
    }

    @Core.dispatch()
    static setDraft({state, key, value}) {
        return state.setIn(['messages', 'drafts', key], value);
    }

    @Core.dispatch()
    static setFilter({state, value}) {
        return state.setIn(['messages', 'filter'], value);
    }

    @Core.dispatch()
    static setGroup({state, group}) {
        return state.setIn(['messages', 'group'], group);
    }

    @Core.dispatch()
    static setSort({state, sort}) {
        return state.setIn(['messages', 'sort'], sort);
    }

    @Core.memo(() => [
        state => state.messages.contacts
    ])
    static getNotifications(contacts) {
        if (Array.isArray(contacts)) {
            contacts = contacts.filter(i => i.unread);
        }

        return contacts;
    }
}