import Core from 'core';
import Demo from 'demo';
import TextField from './text-field';
import 'index.scss';

Core.render(
    <Demo title="TextField">
        <Demo.Item title="Default">
            <TextField
                value="TextField"
                onChange={e => {
                    console.log('onChange: ', e);
                }}/>
        </Demo.Item>
        <Demo.Item title="Disabled">
            <TextField
                disabled={true}
                value="TextField"/>
        </Demo.Item>
        <Demo.Item title="Error">
            <TextField
                error="Error!"
                value="TextField"/>
        </Demo.Item>
    </Demo>
);