import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Icon from 'component/icon';
import Checkbox from 'component/checkbox';
import Button from 'component/button';
import './confirm.scss';

export default class Confirm extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'onConfirm',
            'onReject',
            'onCheckboxChange'
        ]
    }, {
        group: 'icon',
        include: 'icon:name'
    }, {
        group: 'text',
        include: 'text:children'
    })
    @Core.defaults({
        icon: 'alert-box'
    })
    @Core.state(() => ({
        doNotAskAgain: false
    }))
    @Core.types({
        text: Types.node,
        onConfirm: Types.func,
        onReject: Types.func,
        onCheckboxChange: Types.func
    })
    renderComponent() {
        this.confirmed = false;

        return (
            <Popup {...this.rest}
                prefix="confirm"
                onClose={this.handleClose}>
                {this.renderChildren}
            </Popup>
        );
    }

    @Core.bind()
    renderChildren({handleClose}) {
        let {doNotAskAgain} = this.state;

        this.closePopup = handleClose;

        return <>
            <div prefix="confirm__body">
                <Icon {...this.icon}
                    prefix="confirm__icon"
                    size="large"/>
                <div {...this.text}
                    prefix="confirm__text"/>
            </div>
            <div prefix="confirm__footer">
                <Checkbox
                    prefix="confirm__checkbox"
                    label="Больше не спрашивать"
                    value={doNotAskAgain}
                    onChange={this.handleCheckboxChange}/>
                <Button
                    prefix="confirm__no-button"
                    text="Нет"
                    onClick={this.handleNoClick}/>
                <Button
                    prefix="confirm__yes-button"
                    text="Да"
                    onClick={this.handleYesClick}/>
            </div>
        </>;
    }

    @Core.bind()
    handleCheckboxChange(event) {
        this.setState({doNotAskAgain: event.value});
        this.fire('onCheckboxChange', event);
    }

    @Core.bind()
    handleNoClick() {
        this.closePopup();
    }

    @Core.bind()
    handleYesClick() {
        this.confirmed = true;
        this.closePopup();
    }

    @Core.bind()
    handleClose() {
        if (this.confirmed) {
            this.fire('onConfirm');
        } else {
            this.fire('onReject');
        }
    }
}