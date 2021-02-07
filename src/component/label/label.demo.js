import Core from 'core';
import Demo from 'demo';
import Label from './label';
import 'index.scss';

let style = `
    .demo--label .demo--label-content {
        width: 70px;
        height: 40px;
        background: lightgreen;
    }
`

Core.render(
    <Demo
        title="Label"
        style={style}>
        <Demo.Item title="Default">
            <Label text="Label:">
                <div className="demo--label-content"/>
            </Label>
        </Demo.Item>
        <Demo.Item title="Position">
            {['left', 'right', 'top', 'bottom'].map(i => (
                <Label
                    key={i}
                    position={i}
                    text="Label:">
                    <div className="demo--label-content"/>
                </Label>
            ))}
        </Demo.Item>
        <Demo.Item title="Align">
            {['start', 'center', 'end'].map(i => (
                <Label
                    key={i}
                    align={i}
                    text="Label:">
                    <div className="demo--label-content"/>
                </Label>
            ))}
        </Demo.Item>
    </Demo>
);