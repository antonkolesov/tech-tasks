import Core from 'core';
import Types from 'types';
import AttachmentPopup from 'component/attachment-popup';
import ToolTable from 'component/tool-table';
import './tool-popup.scss';

export default class ToolPopup extends Core.Component {

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
    @Core.types({
        data: Types.oneOfType([
            Types.arrayOf(Types.tool),
            Types.loading
        ]),
        sort: Types.exact({
            sort: Types.string,
            order: Types.string
        }),
        onSortChange: Types.func
    })
    renderComponent() {
        return (
            <AttachmentPopup {...this.rest}
                prefix="tool-popup"
                title="Инструменты">
                {() => (
                    <ToolTable {...this.table}
                        prefix="tool-popup__table"/>
                )}
            </AttachmentPopup>
        );
    }
}