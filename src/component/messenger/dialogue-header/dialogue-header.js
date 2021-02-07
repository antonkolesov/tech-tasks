import Core from 'core';
import Types from 'types';
import Menu from 'component/menu'
import './dialogue-header.scss';

let items = [{
    key: 'contacts',
    icon: 'contacts'
}, {
    key: 'close',
    icon: 'close'
}];

export default class DialogueHeader extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'contact',
            'onActiveTabChange',
            'onClose'
        ]
    })
    @Core.types({
        contact: Types.contact,
        onActiveTabChange: Types.func,
        onClose: Types.func
    })
    renderComponent() {
        let {contact} = this.own,
            active = false,
            title;

        if (contact) {
            let {name, department} = contact;
            title = name.last + ' ' + name.first + ' ' + name.middle + ' (' + department.key.toString().padStart(2, '0') + ')';
            active = contact.active;
        }

        return (
            <div {...this.rest}
                prefix="messenger-dialogue-header">
                <div
                    prefix="messenger-dialogue-header__status"
                    modifiers={{active}}/>
                <div prefix="messenger-dialogue-header__title">
                    {title}
                </div>
                <Menu
                    prefix="messenger-dialogue-header__menu"
                    orientation="horizontal"
                    items={items}
                    onChange={this.handleChange}/>
            </div>
        );
    }

    @Core.bind()
    handleChange(event) {
        let action = event.value;

        switch (action) {
            case 'contacts':
                this.fire('onActiveTabChange', {
                    activeTab: action
                });
                break;
            case 'close':
                this.fire('onClose');
                break;
        }
    }
}