import Core from 'core';
import Demo from 'demo';
import Icon from './icon';
import 'index.scss';

Core.render(
    <Demo title="Icon">
        <Demo.Item title="Name">
            <Icon name="demo"/>
        </Demo.Item>
        <Demo.Item title="Size">
            {['small', 'medium', 'large'].map(i => (
                <Icon
                    key={i}
                    size={i}
                    name="demo"/>
            ))}
        </Demo.Item>
    </Demo>
);