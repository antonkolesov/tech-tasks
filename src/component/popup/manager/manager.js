import Core from 'core';
import Popup from 'component/popup';
import Alert from 'component/popup/alert';
import Confirm from 'component/popup/confirm';
import './manager.scss';

let types = {
    alert: Alert,
    confirm: Confirm
};

export default class Manager extends Core.Component {

    static open(props) {
        let {instance} = Manager,
            {type} = props;

        if (type) {
            let component = types[type];

            delete props.type;

            if (component) {
                props.component = component;
            }
        }

        instance.fire('onOpen', {popup: props});
    }

    static close(popupKey) {
        let {instance} = Manager;
        instance.fire('onClose', {popupKey});
    }

    @Core.props({
        group: 'own',
        include: [
            'popups',
            'onOpen',
            'onClose'
        ]
    })
    renderComponent() {
        let {popups} = this.own,
            {length} = popups;

        if (!Manager.instance) {
            Manager.instance = this;
        }

        if (length) {
            popups = popups.map((i, k) => {
                let {component: Type = Popup, ...rest} = i,
                    {key} = rest;

                return (
                    <Type {...rest}
                        popupKey={key}
                        transparent={k + 1 !== length}/>
                );
            });
        } else {
            return null;
        }

        return Core.createPortal(
            <>{popups}</>,
            document.querySelector('.viewport') || document.body
        );
    }
}