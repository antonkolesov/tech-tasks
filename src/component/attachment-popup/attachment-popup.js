import Core from 'core';
import Types from 'types';
import DataPopup from 'component/data-popup';
import './attachment-popup.scss';

export default class AttachmentPopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'task',
            'taskKey',
            'title'
        ]
    })
    @Core.types({
        task: Types.task.isRequired,
        taskKey: Types.number.isRequired,
        title: Types.string
    })
    renderComponent() {
        let {task, title} = this.own,
            {partId, partName} = task;

        title = title + ' для ' + partId + ' (' + partName + ')';

        return (
            <DataPopup {...this.rest}
                prefix="attachment-popup"
                resize="all"
                title={title}/>
        );
    }
}