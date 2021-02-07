import Core from 'core';
import Vars from 'data/vars';

let data = {
        account: {},
        contacts: [],
        dialogues: {},
        tasks: [],
        operations: [],
        materials: [],
        tools: [],
        help: {
            tableOfContent: null,
            content: {}
        }
    },
    actions = {
        Account: {
            read: readAccount,
            update: updateAccount
        },
        Contacts: {
            read: readContacts
        },
        Tasks: {
            create: createTasks,
            delete: deleteTasks,
            read: readTasks,
            update: updateTasks
        },
        Help: {
            read: readHelp
        },
        Operations: {
            read: readOperations
        },
        Materials: {
            read: readMaterials
        },
        Tools: {
            read: readTools
        },
        Dialogues: {
            read: readDialogue
        },
        Message: {
            create: createMessage
        }
    },
    year = new Date().getFullYear();

function fetch(url, args, timeout = 500) {
    return new Promise((resolve, reject) => {
        let [namespace, action] = url.split(':'),
            handler = actions[namespace][action],
            {result, errors} = handler(args);

        setTimeout(() => {
            if (errors) {
                reject(errors);
            } else {
                resolve(result);
            }
        }, timeout);
    });
}

function response(result, errors) {
    let response = {};

    if (result !== undefined) {
        response.result = result;
    }

    if (errors && !Core.isEmpty(errors)) {
        response.errors = errors;
    }

    return response;
}

function randomArrayItem(array) {
    return array[
        randomInteger(0, array.length - 1)
    ];
}

function randomBoolean(num = 0.5) {
    return Math.random() < num ? false : true;
}

function randomContact(key) {
    let {dialogues} = data,
        contact = randomUser(key);
    
    contact.active = randomBoolean();

    contact.message = dialogues[key] = {
        key: randomInteger(20, 40),
        from: key,
        to: 0,
        sended: randomInteger(
            new Date(year, 0, 1).getTime(),
            new Date(year, 0, 31).getTime()
        ),
        text: randomArrayItem(Vars.messages)
    };

    return contact;
}

function randomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomPartId() {
    return (
        randomArrayItem(Vars.partPrefixes) + '.' +
        randomInteger(10, 99) * 10 + randomInteger(10, 99) * 10 + '.' +
        randomInteger(100, 999)
    );
}

function randomTask(key) {
    let from = new Date(year, 0, 1).getTime(),
        to = new Date(2022, 0, 1).getTime() - 1,
        attachments = {};
    
    ['drawing', 'assembly'].forEach(i => {
        if (randomBoolean(0.2)) {
            attachments[i] = randomInteger(0, 9);
        }
    });

    if (randomBoolean(0.2)) {
        attachments.operations = data.operations.push([]) - 1;

        ['materials', 'tools'].forEach(i => {
            if (randomBoolean(0.2)) {
                attachments[i] = data[i].push([]) - 1;
            }
        });
    }

    return {
        key,
        partId: randomPartId(),
        partName: randomArrayItem(Vars.partNames),
        type: randomArrayItem(Vars.taskTypes),
        state: randomArrayItem(Vars.taskStates),
        comment: randomArrayItem(Vars.comments),
        created: randomInteger(from, to),
        attachments
    };
}

function randomHelpTableOfContent() {
    let tableOfContent = [],
        items;

    for (let i = 0; i < 60; i++) {
        if (!(i % 4)) {
            let key = tableOfContent.length;

            tableOfContent.push({
                key: 'group-' + key,
                text: 'Раздел ' + (key + 1),
                items: items = []
            });
        }

        items.push({
            key: 'item-' + i,
            text: 'Глава ' + (i + 1)
        });
    }

    return tableOfContent;
}

function randomHelpContent(key) {
    let length = randomInteger(20, 40),
        text = [];

    for (let i = 0; i < length; i++) {
        text[i] = randomArrayItem(Vars.comments);
    }

    return {
        key,
        text,
        title: randomArrayItem(Vars.messages),
    };
}

function randomUser(key) {
    let departmentKey = randomInteger(0, 4);

    return {
        key,
        avatar: 'static/avatar/' + key + '.svg',
        name: {
            first: randomArrayItem(Vars.firstNames),
            middle: randomArrayItem(Vars.middleNames),
            last: randomArrayItem(Vars.lastNames),
        },
        department: {
            key: departmentKey + 1,
            name: Vars.departments[departmentKey]
        },
        position: randomArrayItem(Vars.positions),
        age: randomInteger(20, 70),
        mask: true
    }
}

function randomMachineId() {
    return (
        randomInteger(10, 99) +
        randomArrayItem(Vars.ruLetters) +
        randomInteger(10, 99) * 10
    );
}

function randomOperation(key) {
    let tools = [],
        toolCount = randomInteger(2, 5);

    for (let j = 0; j < toolCount; j++) {
        tools[j] = randomTool(j);
    }

    let materials = [],
        materialCount = randomInteger(2, 5);

    for (let j = 0; j < materialCount; j++) {
        materials[j] = randomMaterial(j);
    }

    let items = [],
        itemCount = randomInteger(1, 3);

    for (let j = 0; j < itemCount; j++) {
        items[j] = {
            key: j,
            text: randomArrayItem(Vars.comments)
        }
    }

    return {
        key,
        tools,
        materials,
        items,
        id: randomInteger(1, 100),
        name: randomArrayItem(Vars.operationNames),
        machine: {
            id: randomMachineId(),
            name: randomArrayItem(Vars.machineNames)
        }
    };
}

function randomMaterialId() {
    return '00' + randomInteger(10, 99) + '.0' + randomInteger(100, 999);
}

function randomMaterial(key) {
    let name = randomArrayItem(Vars.materialNames),
        shape = randomArrayItem(Vars.materialShapes);

    return {
        key,
        name,
        shape,
        id: randomMaterialId(),
        grade: randomArrayItem(Vars.materialGrades[name]),
        size: randomArrayItem(Vars.materialSizes[shape]),
        amount: randomInteger(1, 10),
        unit: 'кг'
    };
}

function randomToolId() {
    return (
        randomInteger(1, 9) * 10 + '.' +
        randomInteger(10, 99) + '.' +
        randomInteger(100, 999)
    );
}

function randomTool(key) {
    return {
        key,
        id: randomToolId(),
        name: randomArrayItem(Vars.toolNames),
        grade: randomArrayItem(Vars.toolGrades),
        count: randomInteger(1, 5),
        unit: 'шт'
    }
}

function readAccount(values) {
    let errors = {};

    if (values && Core.isEmpty(data.account)) {
        let {login, password} = values;

        if (login !== 'user') {
            errors.login = 'Пользователя с таким именем не существует!';
        } else if (password !== 'user') {
            errors.password = 'Проверьте правильность ввода пароля!';
        } else {
            data.account = randomUser(0);
        }
    }

    return response(data.account, errors);
}

function updateAccount(values) {
    if (values) {
        Object.assign(data.account, values);
    } else {
        data.account = {};
    }

    return response(data.account);
}

function readContacts(callback) {
    let {contacts} = data;

    if (!contacts.length) {
        for (let i = 0; i < 20; i++) {
            contacts[i] = randomContact(i + 1);
        }

        contacts[0].unread = contacts[1].unread = true;
    }

    data.messageCallback = callback;

    return response(contacts);
}

function createTasks(tasks) {
    let {length} = data.tasks;

    tasks = Core.toArray(tasks).map((i, k) => (
        Object.assign({}, i, {
            key: length + k,
            partName: randomArrayItem(Vars.partNames),
            created: i.created.getTime(),
            state: 'todo',
            attachments: {}
        })
    ));

    data.tasks.push(...tasks);

    return response(tasks);
}

function deleteTasks(tasks) {
    data.tasks = data.tasks.filter(i => !tasks.includes(i.key));
    return response(tasks);
}

function readTasks() {
    let {tasks} = data;

    if (!tasks.length) {
        for (let i = 0; i < 1000; i++) {
            tasks[i] = randomTask(i);
        }
    }

    return response(tasks);
}

function updateTasks(tasks) {
    tasks.forEach(i => {
        let index = data.tasks.findIndex(j => j.key === i.key);

        if (index !== -1) {
            data.tasks.splice(index, 1, i);
        }
    });

    return response(tasks);
}

function readHelp(activeItem) {
    let {help} = data;

    if (!activeItem) {
        if (!help.tableOfContent) {
            help.tableOfContent = randomHelpTableOfContent();
        }

        return response(help.tableOfContent);
    } else {
        let {content} = help;

        if (!content[activeItem]) {
            content[activeItem] = randomHelpContent(activeItem)
        }

        return response(content[activeItem]);
    }
}

function readOperations(dataKey) {
    let {operations} = data,
        list = operations[dataKey];

    if (!list) {
        list = [];
    } else if (!list.length) {
        let length = randomInteger(20, 30);

        for (let i = 0; i < length; i++) {
            list[i] = randomOperation(i)
        }

        operations[dataKey] = list;
    }

    return response(list);
}

function readMaterials(dataKey) {
    let {materials} = data,
        list = materials[dataKey];

    if (!list) {
        list = [];
    } else if (!list.length) {
        let length = randomInteger(20, 30);

        for (let i = 0; i < length; i++) {
            list[i] = randomMaterial(i);
        }

        materials[dataKey] = list;
    }

    return response(list);
}

function readTools(dataKey) {
    let {tools} = data,
        list = tools[dataKey];

    if (!list) {
        list = [];
    } else if (!list.length) {
        let length = randomInteger(20, 30);

        for (let i = 0; i < length; i++) {
            list[i] = randomTool(i);
        }

        tools[dataKey] = list;
    }

    return response(list);
}

function readDialogue(key) {
    let {dialogues} = data;

    if (!Array.isArray(dialogues[key])) {
        let message = dialogues[key],
            list = dialogues[key] = [];

        for (let i = 0; i < message.key; i++) {
            let message = {
                key: i,
                sended: randomInteger(
                    new Date(year, 0, 1).getTime(),
                    new Date(year, 0, 31).getTime()
                ),
                text: randomArrayItem(Vars.messages)
            }
            
            if (randomBoolean()) {
                message.from = 0;
                message.to = key
            } else {
                message.from = key;
                message.to = 0;
            }

            list[i] = message;
        }

        list.push(message);
    }

    return response(dialogues[key]);
}

function createMessage(message) {
    let dialogue = data.dialogues[message.to],
        contact = data.contacts.find(i => i.key === message.to);
    
    message = Object.assign({}, message, {
        key: dialogue.length,
        sended: Date.now()
    });

    dialogue.push(message);

    contact.active && setTimeout(() => {
        let dialogue = data.dialogues[message.to],
            answer = {
                key: dialogue.length,
                from: message.to,
                to: message.from,
                sended: Date.now(),
                text: randomArrayItem(Vars.messages)
            };

        dialogue.push(answer);

        data.messageCallback({
            message: answer
        });
    }, 2000);

    return response(message);
}

export default {
    fetch
};