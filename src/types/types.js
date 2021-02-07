import Core from 'core';
import PropTypes from 'prop-types';

let Types = Object.create(PropTypes);

Types.taskTypes = Types.oneOf(['create', 'update', 'destroy']);

Types.taskStates = Types.oneOf(['todo', 'doing', 'done']);

Types.loading = function(props, propName, componentName) {
    if (props[propName] !== Core.loading) {
        return new Error(
            'Свойство ' + propName + ' компонента ' + componentName + ' не равно Core.loading'
        );
    }
}

Types.ref = Types.oneOfType([
    Types.func, 
    Types.shape({
        current: Types.instanceOf(Element)
    })
])

Types.task = Types.exact({
    key: Types.number.isRequired,
    partId: Types.string.isRequired,
    partName: Types.string.isRequired,
    type: Types.taskTypes.isRequired,
    state: Types.taskStates.isRequired,
    comment: Types.string,
    created: Types.number.isRequired,
    loading: Types.bool,
    attachments: Types.exact({
        drawing: Types.number,
        assembly: Types.number,
        operations: Types.number,
        materials: Types.number,
        tools: Types.number
    })
});

Types.message = Types.exact({
    key: Types.oneOfType([
        Types.number,
        Types.string
    ]),
    from: Types.number.isRequired,
    to: Types.number.isRequired,
    sended: Types.oneOfType([
        Types.loading,
        Types.number
    ]),
    text: Types.string.isRequired,
});

Types.userName = Types.exact({
    first: Types.string,
    middle: Types.string,
    last: Types.string
});

Types.department = Types.exact({
    key: Types.number.isRequired,
    name: Types.string
});

Types.user = Types.exact({
    key: Types.number.isRequired,
    avatar: Types.string,
    name: Types.userName.isRequired,
    department: Types.department.isRequired,
    position: Types.string.isRequired,
    age: Types.number.isRequired,
    mask: Types.bool
});

Types.contact = Types.exact({
    key: Types.number.isRequired,
    active: Types.bool,
    unread: Types.bool,
    avatar: Types.string,
    name: Types.userName.isRequired,
    department: Types.department.isRequired,
    position: Types.string.isRequired,
    age: Types.number.isRequired,
    mask: Types.bool,
    message: Types.message
});

Types.contactGroup = Types.oneOf(['none', 'alphabet', 'department', 'status']);

Types.contactSort = Types.exact({
    sort: Types.oneOf(['sended', 'firstName', 'middleName', 'lastName', 'department']),
    order: Types.oneOf(['asc', 'desc'])
});

Types.material = Types.exact({
    key: Types.number.isRequired,
    name: Types.string,
    shape: Types.string,
    id: Types.string,
    grade: Types.string,
    size: Types.string,
    amount: Types.number,
    unit: Types.string
});

Types.tool = Types.exact({
    key: Types.number.isRequired,
    id: Types.string,
    name: Types.string,
    grade: Types.string,
    count: Types.number,
    unit: Types.string
});

Types.operation = Types.shape({
    key: Types.number.isRequired,
    tools: Types.arrayOf(Types.tool),
    materials: Types.arrayOf(Types.material),
    items: Types.arrayOf(
        Types.exact({
            key: Types.number.isRequired,
            text: Types.string
        })
    ),
    id: Types.number,
    machine: Types.machine
});

Types.machine = Types.exact({
    id: Types.string,
    name: Types.string
});

Types.theme = Types.oneOf(['red', 'green', 'blue', 'purple']);

export default Types;