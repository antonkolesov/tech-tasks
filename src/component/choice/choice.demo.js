import Core from 'core';
import Demo from 'demo';
import Choice from './choice';
import 'index.scss';

let style = `
    .demo--choice .choice__label:before {
        content: "\\F133";
    }
`

Core.render(
    <Demo
        title="Choice"
        style={style}>
        <Demo.Item title="Value">
            <Choice
                value={false}
                type="checkbox"
                label="Choice"/>
            <Choice
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="Disabled">
            <Choice
                disabled={true}
                value={true}
                type="checkbox"
                label="Choice"/>
        </Demo.Item>
        <Demo.Item title="OnChange">
            <Choice
                type="checkbox"
                label="Choice"
                onChange={e => (
                    console.log('onChange: ', e)
                )}/>
        </Demo.Item>
    </Demo>
);