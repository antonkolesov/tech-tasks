import Core from 'core';
import Types from 'types';
import Avatar from 'component/avatar';
import './contact.scss';

export default class Contact extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'contact',
            'onActiveTabChange'
        ]
    })
    @Core.types({
        contact: Types.contact,
        onActiveTabChange: Types.func
    })
    renderComponent() {
        let {contact} = this.own,
            {active, department, message, name} = contact,
            {sended, text} = message;

        return (
            <div {...this.rest}
                prefix="messenger-contact"
                onClick={this.handleContactClick}>
                <Avatar
                    prefix="messenger-contact__left"
                    size="medium"
                    active={true}
                    contact={contact}
                    onClick={this.handleAvatarClick}/>
                <div prefix="messenger-contact__center">
                    <div prefix="messenger-contact__name">
                        {name.last + ' ' + name.first + ' ' + name.middle + ' (' + department.key.toString().padStart(2, '0') + ')'}
                    </div>
                    <div prefix="messenger-contact__message">
                        {text}
                    </div>
                </div>
                <div prefix="messenger-contact__right">
                    <div
                        prefix="messenger-contact__status"
                        modifiers={{active}}/>
                    <div prefix="messenger-contact__date">
                        {Core.formatDate(new Date(sended), 'd M')}
                    </div>
                </div>
            </div>
        );
    }

    @Core.bind()
    handleContactClick(event) {
        let {contact} = this.own,
            {currentTarget, target} = event;

        if (currentTarget === target) { 
            this.fire('onActiveTabChange', {
                activeTab: 'dialogue',
                contact
            });
        }
    }
}