import Core from 'core';
import Demo from 'demo';
import AttachmentPopup from './attachment-popup';
import 'index.scss';

Core.render(
    <Demo title="AttachmentPopup">
        <Demo.Item title="Default">
            <AttachmentPopup
                title="One"
                data={['-']}
                task={{
                    partId: 'Two',
                    partName: 'Three'
                }}>
                Children
            </AttachmentPopup>
        </Demo.Item>
    </Demo>
);