import Core from 'core';
import Demo from 'demo';
import Draggable from './draggable';
import 'index.scss';

Core.render(
    <Demo title="Draggable">
        <Demo.Item title="Default">
            <Draggable
                onDragStart={e => {
                    console.log('onDragStart: ', e);
                }}
                onDrag={e => {
                    console.log('onDrag: ', e);
                }}
                onDragEnd={e => {
                    console.log('onDragEnd: ', e);
                }}>
                {props => <div {...props}>Draggable</div>}
            </Draggable>
        </Demo.Item>
    </Demo>
);