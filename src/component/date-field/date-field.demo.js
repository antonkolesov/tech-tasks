import Core from 'core';
import Demo from 'demo';
import DateField from './date-field';
import 'index.scss';

Core.render(
    <Demo title="DateField">
        <Demo.Item title="Default">
            <DateField
                value={new Date()}
                onChange={e => console.log('onChange', e)}/>
        </Demo.Item>
    </Demo>
);