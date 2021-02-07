import Core from 'core';
import Types from 'types';
import Avatar from 'component/avatar';
import './message.scss';

export default class Message extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'contact',
            'message',
            'mode'
        ]
    })
    @Core.types({
        contact: Types.contact,
        message: Types.message,
        mode: Types.oneOf(['i', 'he'])
    })
    renderComponent() {
        let {contact, message, mode} = this.own,
            {sended, text} = message

        return (
            <div {...this.rest}
                prefix="messenger-message"
                modifiers={{mode}}>
                <Avatar
                    prefix="messenger-message__avatar"
                    size="small"
                    active={true}
                    contact={contact}/>
                <div prefix="messenger-message__text">
                    {text}
                    <div prefix="messenger-message__time">
                        {sended === Core.loading ? 'Отправка...' : Core.formatDate(new Date(sended), 'd M H:i')}
                    </div>
                </div>
            </div>
        );
    }
}