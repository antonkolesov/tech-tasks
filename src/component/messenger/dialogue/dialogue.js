import Core from 'core';
import Types from 'types';
import Message from '../message';
import './dialogue.scss';

export default class Dialogue extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'account',
            'contact',
            'dialogue'
        ]
    })
    @Core.innerRefs(
        'root'
    )
    @Core.types({
        account: Types.user,
        content: Types.contact,
        dialogue: Types.arrayOf(Types.message)
    })
    renderComponent() {
        let {dialogue} = this.own,
            {rootRef} = this.innerRefs;

        return (
            <div {...this.rest}
                prefix="messenger-dialogue"
                innerRef={rootRef}
                onScroll={this.handleScroll}>
                {dialogue.map(this.renderMessage)}
            </div>
        );
    }

    @Core.bind()
    renderMessage(message) {
        let {account, contact} = this.own,
            {from, key} = message,
            props;

        if (from) {
            props = {
                contact: contact,
                mode: 'he'
            }
        } else {
            props = {
                contact: account,
                mode: 'i'
            }
        }

        return (
            <Message {...props}
                prefix="messenger-dialogue__message"
                key={key}
                message={message}/>
        );
    }

    @Core.bind()
    handleBeforeMount() {
        this.cachedProps || (this.cachedProps = {
            cachedContact: {},
            cachedMessage: {},
            scrollTimestamp: 0
        });
    }

    @Core.bind()
    handleBeforeRender() {
        let {rootEl} = this.innerRefs,
            isScrolled = false;
        if (rootEl) {
            let {clientHeight, scrollHeight, scrollTop} = rootEl;

            isScrolled = (scrollHeight - scrollTop === clientHeight) || (Date.now() - this.cachedProps.scrollTimestamp < 50);
        }

        this.cachedProps.isScrolledToEnd = isScrolled;
    }

    @Core.bind()
    handleAfterRender() {
        let {cachedContact, cachedMessage, isScrolledToEnd} = this.cachedProps,
            {contact, dialogue} = this.own,
            message = dialogue[dialogue.length - 1];

        if (cachedContact.key !== contact.key) {
            this.scrollToEnd();
        } else if ((cachedMessage.sended !== Core.loading && message.sended === Core.loading) || isScrolledToEnd) {
            this.scrollToEnd(true);
        }

        Object.assign(this.cachedProps, {
            cachedContact: contact,
            cachedMessage: message
        });
    }

    @Core.bind()
    handleScroll() {
        this.cachedProps.scrollTimestamp = Date.now()
    }

    scrollToEnd(smooth) {
        let {rootEl} = this.innerRefs;

        rootEl.scrollTo({
            top: rootEl.scrollHeight,
            behavior: smooth ? 'smooth' : 'auto'
        });
    }
}