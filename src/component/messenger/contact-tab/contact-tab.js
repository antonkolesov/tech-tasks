import Core from 'core';
import ContactHeader from '../contact-header';
import ContactFilter from '../contact-filter';
import ContactList from '../contact-list';
import './contact-tab.scss';

export default class ContactTab extends Core.Component {

    @Core.props({
        group: 'contactHeader',
        component: ContactHeader
    }, {
        group: 'contactFilter',
        component: ContactFilter
    }, {
        group: 'contactList',
        component: ContactList
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="messenger-contact-tab">
                <ContactHeader {...this.contactHeader}
                    prefix="messenger-contact-tab__header"/>
                <ContactFilter {...this.contactFilter}
                    prefix="messenger-contact-tab__filter"/>
                <ContactList {...this.contactList}
                    prefix="messenger-contact-tab__list"/>
            </div>
        );
    }
}