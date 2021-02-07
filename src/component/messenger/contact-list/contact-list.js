import Core from 'core';
import Types from 'types';
import NotFoundOverlay from 'component/not-found-overlay';
import Contact from '../contact';
import './contact-list.scss';

let groupFns = {
        alphabet: contact => contact.name.last.charAt(0),
        department: contact => contact.department.key.toString().padStart(2, '0'),
        status: contact => contact.active ? 'Активные' : 'Не активные'
    },
    sortFns = {
        firstName: contact => contact.name.first,
        middleName: contact => contact.name.middle,
        lastName: contact => contact.name.last,
        department: contact => contact.department.key,
        sended: contact => contact.message.sended
    };

export default class ContactList extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'contacts',
            'group',
            'filter',
            'sort'
        ]
    }, {
        group: 'contact',
        component: Contact
    })
    @Core.types({
        contacts: Types.arrayOf(Types.contact),
        group: Types.contactGroup,
        filter: Types.string,
        sort: Types.contactSort
    })
    renderComponent() {
        let {contacts, filter, sort, group} = this.own,
            body;

        if (filter) {
            contacts = this.filterContacts(contacts, filter);
        }

        if (contacts.length === 0) {
            body = (
                <NotFoundOverlay
                    prefix="messenger-contact-list__not-found-overlay"
                    text="Контакты не найдены!"/>
            );
        } else {
            if (sort) {
                contacts = this.sortContacts(contacts, sort);
            }
    
            if (group) {
                body = this.groupContacts(contacts, group).map(([groupName, contacts]) => (
                    <div
                        prefix="messenger-contact-list__group"
                        key={groupName}>
                        <div prefix="messenger-contact-list__group-header">
                            {groupName}
                        </div>
                        <div prefix="messenger-contact-list__group-body">
                            {contacts.map(this.renderContact)}
                        </div>
                    </div>
                ));
            } else {
                body = contacts.map(this.renderContact);
            }
        }

        return (
            <div {...this.rest}
                prefix="messenger-contact-list">
                {body}
            </div>
        );
    }

    @Core.bind()
    renderContact(contact) {
        let {key} = contact;

        return (
            <Contact {...this.contact}
                prefix="messenger-contact-list__contact"
                key={key}
                contact={contact}/>
        );
    }

    filterContacts(contacts, filter) {
        let pattern = new RegExp(filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

        return contacts.filter(i => {
            let {first, middle, last} = i.name;

            return (
                pattern.test(first) ||
                pattern.test(middle) ||
                pattern.test(last)
            )
        });
    }

    sortContacts(contacts, {sort, order}) {
        let sign = order === 'asc' ? 1 : -1,
            sortFn = sortFns[sort];

        return [].concat(contacts).sort((a, b) => {
            a = sortFn(a);
            b = sortFn(b);
            return (a > b ? 1 : (a < b ? -1 : 0)) * sign;
        });
    }

    groupContacts(contacts, group) {
        let groupFn = groupFns[group],
            groupedContacts = {};

        contacts.forEach(i => {
            let groupName = groupFn(i);
            (groupedContacts[groupName] || (groupedContacts[groupName] = [])).push(i);
        });

        return Object.entries(groupedContacts).sort((a, b) => a[0] > b[0] ? 1 : -1);
    }
}