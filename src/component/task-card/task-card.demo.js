import Core from 'core';
import Demo from 'demo';
import TaskCard from './task-card';
import 'index.scss';

let task = {
    "key":1,
    "partId":"ЯКЛЮ.800280.398",
    "partName":"Педаль",
    "type":"update",
    "state":"doing",
    "comment":"Деталь машины, механизма, прибора цилиндрической или конической формы (с осевой симметрией), имеющая осевое отверстие, в которое входит сопрягаемая деталь.",
    "created":1578560178636,
    "attachments":{
        "materials":640,
        "tools":52,
        "operations":832
    }
};

Core.render(
    <Demo title="TaskCard">
        <Demo.Item title="Default">
            <TaskCard
                showState={true}
                task={task}/>
        </Demo.Item>
    </Demo>
);