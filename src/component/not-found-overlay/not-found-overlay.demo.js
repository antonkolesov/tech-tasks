import Core from 'core';
import Demo from 'demo';
import NotFoundOverlay from './not-found-overlay';
import 'index.scss';

let style = `
    .demo--not-found-overlay .not-found-overlay {
        width: 200px;
        height: 200px;
    }
`

Core.render(
    <Demo
        title="NotFoundOverlay"
        style={style}>
        <Demo.Item title="Default">
            <NotFoundOverlay/>
        </Demo.Item>
    </Demo>
);