import Core from 'core';
import Demo from 'demo';
import Radio from './radio';
import 'index.scss';

Core.render(
    <Demo
        title="Checkbox">
        <Demo.Item title="Value">
            <Radio
                value={false}
                type="checkbox"
                label="Choice"/>
            <Radio
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="Disabled">
            <Radio
                disabled={true}
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="OnChange">
            <Radio
                type="checkbox"
                label="Choice"
                onChange={e => (
                    console.log('onChange: ', e)
                )}/>
        </Demo.Item>
    </Demo>
);