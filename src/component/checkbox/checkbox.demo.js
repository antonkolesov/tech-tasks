import Core from 'core';
import Demo from 'demo';
import Checkbox from './checkbox';
import 'index.scss';

Core.render(
    <Demo
        title="Checkbox">
        <Demo.Item title="Value">
            <Checkbox
                value={false}
                type="checkbox"
                label="Choice"/>
            <Checkbox
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="Disabled">
            <Checkbox
                disabled={true}
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="OnChange">
            <Checkbox
                type="checkbox"
                label="Choice"
                onChange={e => (
                    console.log('onChange: ', e)
                )}/>
        </Demo.Item>
    </Demo>
);