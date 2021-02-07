import Core from 'core';
import Demo from 'demo';
import Grid from './grid';
import 'index.scss';

let data = [
    {key: '1', text: '1'},
    {key: '2', text: '2'},
    {key: '3', text: '3'},
    {key: '4', text: '4'},
    {key: '5', text: '5'},
    {key: '6', text: '6'},
    {key: '7', text: '7'},
    {key: '8', text: '8'},
];

Core.render(
    <Demo title="Grid">
        <Demo.Item title="Default">
            <Grid
                data={data}/>
        </Demo.Item>
        <Demo.Item title="ColumnCount">
            <Grid
                columnCount={4}
                data={data}/>
        </Demo.Item>
    </Demo>
);