import Core from 'core';
import AttachmentPopup from 'component/attachment-popup';
import OperationList from 'component/operation-list';
import './operation-popup.scss';

export default class OperationPopup extends Core.Component {

    renderComponent() {
        let {data} = this.rest;

        return (
            <AttachmentPopup {...this.rest}
                prefix="operation-popup"
                title="Операции">
                {() => (
                    <OperationList
                        prefix="operation-popup__list"
                        data={data}/>
                )}
            </AttachmentPopup>
        );
    }
}