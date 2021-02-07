import Core from 'core';
import Demo from 'demo';
import MaterialTable from './material-table';
import 'index.scss';

let data = [{"name":"Латунь","shape":"Шестиганник","key":0,"id":"0025.0962","grade":"ЛО70-1","size":"5","amount":8,"unit":"кг"},{"name":"Алюминий","shape":"Лист","key":1,"id":"0086.0618","grade":"АЛ3","size":"100x100","amount":3,"unit":"кг"},{"name":"Сталь","shape":"Круг","key":2,"id":"0047.0868","grade":"34ХН1МА","size":"16","amount":8,"unit":"кг"},{"name":"Медь","shape":"Круг","key":3,"id":"0020.0641","grade":"М1","size":"10","amount":10,"unit":"кг"},{"name":"Алюминий","shape":"Круг","key":4,"id":"0036.0444","grade":"АК7","size":"16","amount":8,"unit":"кг"},{"name":"Латунь","shape":"Квадрат","key":5,"id":"0092.0895","grade":"ЛМцА57-3-1","size":"10","amount":4,"unit":"кг"},{"name":"Латунь","shape":"Круг","key":6,"id":"0026.0795","grade":"ЛАЖ60-1-1","size":"18","amount":9,"unit":"кг"},{"name":"Чугун","shape":"Лист","key":7,"id":"0087.0540","grade":"ПВК1","size":"600x600","amount":10,"unit":"кг"},{"name":"Латунь","shape":"Круг","key":8,"id":"0027.0371","grade":"Л85","size":"16","amount":1,"unit":"кг"},{"name":"Алюминий","shape":"Круг","key":9,"id":"0053.0214","grade":"В95","size":"16","amount":4,"unit":"кг"}];

Core.render(
    <Demo title="MaterialTable">
        <Demo.Item title="Default">
            <MaterialTable data={data}/>
        </Demo.Item>
    </Demo>
);