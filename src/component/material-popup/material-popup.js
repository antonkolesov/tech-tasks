import Core from 'core';
import AttachmentPopup from 'component/attachment-popup';
import MaterialTable from 'component/material-table';
import './material-popup.scss';

export default class MaterialPopup extends Core.Component {

    @Core.props({
        group: 'rest',
        include: 'data'
    }, {
        group: 'table',
        include: [
            'data',
            'sort',
            'onSortChange'
        ]
    })
    renderComponent() {
        return (
            <AttachmentPopup {...this.rest}
                prefix="material-popup"
                title="Материалы">
                <MaterialTable {...this.table}
                    prefix="material-popup__table"/>
            </AttachmentPopup>
        );
    }
}