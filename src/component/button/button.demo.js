import Core from 'core';
import Demo from 'demo';
import Button from './button';
import 'index.scss';

Core.render(
    <Demo title="Button">
        <Demo.Item title="Default">
            <Button
                icon="demo"
                text="Button"/>
        </Demo.Item>
        <Demo.Item title="Mode">
            {['iconText', 'icon', 'text'].map(i => (
                <Button
                    key={i}
                    mode={i}
                    icon="demo"
                    text="Button"/>
            ))}
        </Demo.Item>
        <Demo.Item title="Disabled">
            <Button
                disabled={true}
                icon="demo"
                text="Button"/>
        </Demo.Item>
        <Demo.Item title="OnClick">
            <Button
                icon="demo"
                text="Button"
                onClick={() => {
                    alert('OK!');
                }}/>
        </Demo.Item>
    </Demo>
);