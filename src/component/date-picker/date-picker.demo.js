import Core from 'core';
import Demo from 'demo';
import DatePicker from './date-picker';
import 'index.scss';

Core.render(
    <Demo title="DatePicker">
        <Demo.Item title="Mode">
            {['date', 'month', 'year'].map(i => (
                <DatePicker
                    key={i}
                    mode={i}
                    value={new Date()}
                    onChange={e => {
                        console.log('onChange: ', e);
                    }}/>
            ))}
        </Demo.Item>
    </Demo>
);