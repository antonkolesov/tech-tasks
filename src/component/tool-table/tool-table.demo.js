import Core from 'core';
import Demo from 'demo';
import ToolTable from './tool-table';
import 'index.scss';

let data = [{"key":1,"id":"90.44.206","name":"Развёртка","grade":"22-25Г","count":2,"unit":"шт"},{"key":2,"id":"70.87.891","name":"Напильник","grade":"21-16Г2АФД","count":3,"unit":"шт"},{"key":3,"id":"30.74.795","name":"Зенковка","grade":"22-10ХГСН1Д","count":5,"unit":"шт"},{"key":4,"id":"80.31.262","name":"Зенковка","grade":"27-20Х","count":4,"unit":"шт"},{"key":5,"id":"20.14.825","name":"Фреза","grade":"25-09Г2С","count":1,"unit":"шт"},{"key":6,"id":"90.49.453","name":"Напильник","grade":"29-15ГФ","count":4,"unit":"шт"},{"key":7,"id":"40.10.159","name":"Зенкер","grade":"27-14Г2АФ","count":4,"unit":"шт"},{"key":8,"id":"80.14.966","name":"Протяжка","grade":"20-15ГФ","count":5,"unit":"шт"},{"key":9,"id":"70.60.243","name":"Цековка","grade":"28-15ГФД","count":2,"unit":"шт"}];

Core.render(
    <Demo title="ToolTable">
        <Demo.Item title="Default">
            <ToolTable
                data={data}
                sort={{sort: 'id', order: 'asc'}}/>
        </Demo.Item>
    </Demo>
);