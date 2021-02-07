import Core from 'core';
import Demo from 'demo';
import Avatar from './avatar';
import 'index.scss';

Core.render(
    <Demo title="Avatar">
        <Demo.Item title="Size">
            {['small', 'medium', 'large'].map(i => (
                <Avatar
                    key={i}
                    size={i}
                    contact={{avatar: '/static/avatar/0.svg'}}/>
            ))}
        </Demo.Item>
        <Demo.Item title="Size">
            {['small', 'medium', 'large'].map(i => (
                <Avatar
                    key={i}
                    size={i}
                    contact={{lastName: 'ш'}}/>
            ))}
        </Demo.Item>
    </Demo>
);