import Core from 'core';
import Demo from 'demo';
import Popup from './popup';
import 'index.scss';

Core.render(
    <Demo title="Popup">
        <Demo.Item title="Default">
            <Popup
                title="Title"
                children="Children"/>
        </Demo.Item>
        <Demo.Item title="Closable">
            <Popup
                title="Title"
                closable={false}
                children="Children"/>
        </Demo.Item>
    </Demo>
);