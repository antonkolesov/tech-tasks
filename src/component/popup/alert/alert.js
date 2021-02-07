import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Icon from 'component/icon';
import Button from 'component/button';
import './alert.scss';

export default class Alert extends Core.Component {

    @Core.props({
        group: 'icon',
        include: 'icon:name'
    }, {
        group: 'text',
        include: 'text:children'
    })
    @Core.defaults({
        icon: 'alert-box'
    })
    @Core.types({
        text: Types.node
    })
    renderComponent() {
        return (
            <Popup {...this.rest}
                prefix="alert">
                {this.renderChildren}
            </Popup>
        );
    }

    @Core.bind()
    renderChildren({handleClose}) {
        return <>
            <div prefix="alert__body">
                <Icon {...this.icon}
                    prefix="alert__icon"
                    size="large"/>
                <div {...this.text}
                    prefix="alert__text"/>
            </div>
            <div prefix="alert__footer">
                <Button
                    prefix="alert__ok-button"
                    text="OK"
                    onClick={handleClose}/>
            </div>
        </>;
    }
}