import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import ProfilePopup from 'component/profile-popup';
import './avatar.scss';

export default class Avatar extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'active',
            'contact',
            'size'
        ]
    })
    @Core.types({
        active: Types.bool,
        contact: Types.contact,
        size: Types.oneOf(['small', 'medium', 'large'])
    })
    renderComponent() {
        let {style} = this.rest,
            {active, contact, size} = this.own,
            {avatar, name} = contact,
            props = {};

        if (avatar) {
            props.style = Object.assign({}, style, {
                backgroundImage: 'url(' + avatar + ')'
            });
        } else {
            props.children = name.last.charAt(0).toUpperCase();
        }

        if (active) {
            props.onClick = this.handleClick;
        }

        return (
            <div {...this.rest} {...props}
                prefix="avatar"
                modifiers={{active, size}}/>
        );
    }

    @Core.bind()
    handleClick() {
        let {contact: profile} = this.own;

        Popup.open({
            profile,
            key: 'profilePopup',
            component: ProfilePopup
        });
    }
}