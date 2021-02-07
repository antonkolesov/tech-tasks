import Core from 'core';
import Demo from 'demo';
import Popover from './popover';
import 'index.scss';

let style = `
    .demo--popover .container {
        margin: 10px 50px;
    }
    .demo--popover .row {
        display: flex;
    }
    .demo--popover .trigger {
        flex: 0 0 auto;
        margin: 1px;
        width: 100px;
        height: 40px;
        background: lightgreen;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
    }
`

Core.render(
    <Demo
        title="Popover"
        style={style}>
        <Demo.Item title="Position">
            <div className="container">
                {[
                    ['top-start', 'top-center', 'top-end'],
                    ['left-start', null, 'right-start'],
                    ['left-center', null, 'right-center'],
                    ['left-end', null, 'right-end'],
                    ['bottom-start', 'bottom-center', 'bottom-end']
                ].map((i, k) => {
                    let cells = i.map((j, l) => (
                        j == null ? (
                            <div
                                key={j}
                                className="trigger"/>
                        ) : (
                            <Popover
                                key={j}
                                position={j}
                                trigger={props => (
                                    <div {...props}
                                        key={j}
                                        className="trigger">
                                        {j}
                                    </div>
                                )}>
                                Popover
                            </Popover>
                        )
                    ));
                    return (
                        <div
                            key={k}
                            className="row">
                            {cells}
                        </div>
                    );
                })}
            </div>
        </Demo.Item>
        <Demo.Item title="Fit">
            <Popover
                fit="trigger"
                trigger={props => (
                    <div {...props}
                        className="trigger">
                        Trigger
                    </div>
                )}>
                Popover
            </Popover>
        </Demo.Item>
    </Demo>
);