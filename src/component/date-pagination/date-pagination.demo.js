import Core from 'core';
import Demo from 'demo';
import DatePagination from './date-pagination';
import 'index.scss';

Core.render(
    <Demo title="DatePagination">
        <Demo.Item title="Mode">
            <DatePagination
                date={new Date()}
                range="month"/>
        </Demo.Item>
    </Demo>
);