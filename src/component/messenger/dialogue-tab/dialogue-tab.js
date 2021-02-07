import Core from 'core';
import Types from 'types';
import LoadingOverlay from 'component/loading-overlay';
import NotFoundOverlay from 'component/not-found-overlay';
import DialogueHeader from '../dialogue-header';
import Dialogue from '../dialogue';
import MessageEditor from '../message-editor';
import './dialogue-tab.scss';

export default class DialogueTab extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'account',
            'contact',
            'dialogue',
            'onMessagesRead',
            'onMessageSend'
        ]
    }, {
        group: 'header',
        component: DialogueHeader
    }, {
        group: 'dialogue',
        component: Dialogue
    }, {
        group: 'editor',
        component: MessageEditor
    })
    @Core.types({
        account: Types.user,
        contact: Types.contact,
        dialogue: Types.oneOfType([
            Types.array,
            Types.loading
        ]),
        onMessagesRead: Types.func,
        onMessageSend: Types.func
    })
    renderComponent() {
        let {dialogue} = this.own,
            body;

        if (!dialogue) {
            body = (
                <NotFoundOverlay
                    prefix="messenger-dialogue-tab__not-found-overlay"
                    text="Нет открытых диалогов!"/>
            );
        } else if (dialogue === Core.loading) {
            body = (
                <LoadingOverlay
                    prefix="messenger-dialogue-tab__loading-overlay"/>
            );
        } else {
            if (dialogue.length) {
                body = (
                    <Dialogue {...this.dialogue}
                        prefix="messenger-dialogue-tab__dialogue"/>
                );
            } else {
                body = (
                    <NotFoundOverlay
                        prefix="messenger-dialogue-tab__not-found-overlay"
                        text="Нет сообщений!"/>
                );
            }

            body = <>
                {body}
                <MessageEditor {...this.editor}
                    prefix="messenger-dialogue-tab__editor"
                    onMessageSend={this.handleMessageSend}/>
            </>;
        }

        return (
            <div {...this.rest}
                prefix="messenger-dialogue-tab">
                <DialogueHeader {...this.header}
                    prefix="messenger-dialogue-tab__header"/>
                {body}
            </div>
        );
    }

    @Core.bind()
    handleAfterRender() {
        let {contact, dialogue} = this.own;

        if (contact && !dialogue) {
            this.fire('onMessagesRead', {
                key: contact.key
            });
        }
    }

    @Core.bind()
    handleMessageSend(event) {
        let {account, contact} = this.own,
            {value} = event;
        
        this.fire('onMessageSend', {
            message: {
                text: value,
                from: account.key,
                to: contact.key
            }
        });
    }
}