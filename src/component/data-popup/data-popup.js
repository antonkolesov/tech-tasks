import Core from 'core';
import Types from 'types';
import Alert from 'component/popup/alert';
import Icon from 'component/icon';
import Popup from 'component/popup';
import './data-popup.scss';

export default class DataPopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'data',
            'dataKey',
            'onLoad'
        ]
    })
    @Core.types({
        data: Types.oneOfType([
            Types.array,
            Types.loading
        ]),
        dataKey: Types.number,
        onLoad: Types.func
    })
    renderComponent() {
        let {data} = this.own;

        if (!data) {
            return null;
        }

        if (data === Core.loading) {
            return (
                <div prefix="popup__overlay">
                    <Icon
                        prefix="data-popup__loading"
                        name="loading"/>
                </div>
            );
        }

        if (data.length === 0) {
            let {popupKey, title} = this.rest;

            return (
                <Alert
                    prefix="data-popup__alert"
                    text="Ничего не найдено!"
                    title={title}
                    popupKey={popupKey}/>
            );
        }

        return (
            <Popup {...this.rest}
                prefix="data-popup"/>
        );
    }

    @Core.bind()
    handleAfterRender() {
        let {data, dataKey} = this.own;

        if (!data) {
            this.fire('onLoad', {dataKey});
        }
    }
}