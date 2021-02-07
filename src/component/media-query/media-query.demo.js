import Core from 'core';
import Demo from 'demo';
import MediaQuery from './media-query';
import 'index.scss';

Core.render(
    <Demo title="MediaQuery">
        <Demo.Item title="Default">
            <MediaQuery
                onResize={e => {
                    console.log('onResize: ', e);
                }}>
                {props => <div {...props}>MediaQuery</div>}
            </MediaQuery>
        </Demo.Item>
    </Demo>
);