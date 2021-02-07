import Core from 'core';
import Demo from 'demo';
import LoadingOverlay from './loading-overlay';
import 'index.scss';

Core.render(
    <Demo title="LoadingOverlay">
        <Demo.Item title="Default">
            <LoadingOverlay/>
        </Demo.Item>
    </Demo>
);