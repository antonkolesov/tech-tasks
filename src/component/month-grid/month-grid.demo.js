import Core from 'core';
import Demo from 'demo';
import MonthGrid from './month-grid';
import 'index.scss';

Core.render(
    <Demo title="MonthGrid">
        <Demo.Item title="Default">
            {[new Date('2020-01-01'), new Date('2020-02-01'), new Date('2020-03-01')].map((i, k) => (
                <MonthGrid
                    key={k}
                    date={i}/>
            ))}
        </Demo.Item>
    </Demo>
);