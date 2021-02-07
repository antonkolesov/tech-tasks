import Core from 'core';
import Demo from 'demo';
import NotFoundPage from './not-found-page';
import 'index.scss';

Core.render(
    <Demo>
        <Demo.Item>
            <NotFoundPage/>
        </Demo.Item>
    </Demo>
);