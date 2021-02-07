import Core from 'core';
import Demo from 'demo';
import DataPopup from './data-popup';
import 'index.scss';

let style = `
    .demo--data-popup select {
        margin-bottom: 14px;
    }
`

class DataPopupDemo extends Core.Component {

    @Core.state(() => ({
        value: 'null'
    }))
    renderComponent() {
        let {value} = this.state,
            props;

        switch (value) {
            case 'null':
                props = {data: null, dataKey: 1};
                break;
            case 'loading':
                props = {data: 'loading'};
                break;
            case 'empty':
                props = {data: []};
                break;
            case 'data':
                props = {data: [1]};
                break;
        }

        return <>
            <select
                value={value}
                onChange={this.handleChange}>
                <option value="null">Null</option>
                <option value="loading">Loading</option>
                <option value="empty">Empty</option>
                <option value="data">Data</option>
            </select>
            <div>
                <DataPopup {...props}
                    title="Title"
                    onLoad={e => {
                        console.log('onLoad: ', e);
                    }}/>
            </div>
        </>;
    }

    @Core.bind()
    handleChange(event) {
        let {value} = event.target;
        this.setState({value});
    }
}

Core.render(
    <Demo
        title="DataPopup"
        style={style}>
        <Demo.Item title="Default">
            <DataPopupDemo/>
        </Demo.Item>
    </Demo>
);