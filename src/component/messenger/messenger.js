import Core from 'core';
import Types from 'types';
import ContactTab from './contact-tab';
import DialogueTab from './dialogue-tab';
import LoadingOverlay from 'component/loading-overlay';
import NotFoundOverlay from 'component/not-found-overlay';
import './messenger.scss';

export default class Messenger extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'activeDialogue',
            'activeTab',
            'contacts',
            'drafts',
            'dialogues',
            'onContactsRead',
            'onMessageChange'
        ]
    }, {
        group: 'contactTab',
        component: ContactTab
    }, {
        group: 'dialogueTab',
        component: DialogueTab
    })
    @Core.defaults({
        drafts: []
    })
    @Core.types({
        activeDialogue: Types.number,
        activeTab: Types.oneOf(['dialogue', 'contacts']),
        contacts: Types.oneOfType([
            Types.arrayOf(Types.contact),
            Types.loading
        ]),
        drafts: Types.objectOf(Types.string),
        dialogues: Types.objectOf(
            Types.oneOfType([
                Types.arrayOf(Types.message),
                Types.loading
            ])
        ),
        onContactsRead: Types.func,
        onMessageChange: Types.func
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="messenger">
                {this.renderChildren()}
            </div>
        );
    }

    renderChildren() {
        let {contacts} = this.own;

        if (!contacts) {
            return null;
        } else if (contacts === Core.loading) {
            return (
                <LoadingOverlay
                    prefix="messenger__loading-overlay"/>
            );
        } else if (contacts.length === 0) {
            return (
                <NotFoundOverlay
                    prefix="messenger__not-found-overlay"
                    text="Контакты не найдены!"/>
            );
        } else {
            let {activeTab} = this.own;

            switch (activeTab) {
                case 'contacts':
                    return (
                        <ContactTab {...this.contactTab}
                            prefix="messenger__contact-tab"/>
                    );
                case 'dialogue':
                    let {activeDialogue, contacts, drafts, dialogues} = this.own,
                        props;

                    if (typeof activeDialogue === 'number') {
                        props = {
                            contact: contacts.find(i => i.key === activeDialogue),
                            dialogue: dialogues[activeDialogue],
                            draft: drafts[activeDialogue] || ''
                        };
                    } else {
                        props = {
                            dialogue: null
                        };
                    }

                    return (
                        <DialogueTab {...this.dialogueTab} {...props}
                            prefix="messenger__dialogue-tab"
                            onMessageChange={this.handleMessageChange}/>
                    );
            }
        }
    }

    @Core.bind()
    handleAfterRender() {
        let {contacts} = this.own;

        if (!contacts) {
            this.fire('onContactsRead');
        }
    }

    @Core.bind()
    handleMessageChange({value}) {
        let {activeDialogue} = this.own;

        this.fire('onMessageChange', {
            key: activeDialogue,
            value
        });
    }
}