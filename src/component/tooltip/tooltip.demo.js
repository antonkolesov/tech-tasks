import Core from 'core';
import Demo from 'demo';
import Tooltip from './tooltip';
import 'index.scss';

Core.render(
    <Demo title="Tooltip">
        <Demo.Item title="Default">
            <Tooltip
                trigger={props => <div {...props}>Trigger</div>}>
                Tooltip
            </Tooltip>
        </Demo.Item>
    </Demo>
);