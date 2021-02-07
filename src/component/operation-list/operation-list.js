import Core from 'core';
import Types from 'types';
import './operation-list.scss';

export default class OperationList extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'data',
            'dataKey'
        ]
    })
    @Core.types({
        data: Types.arrayOf(Types.operation),
        dataKey: Types.number
    })
    renderComponent() {
        let {data} = this.own;

        return (
            <div {...this.rest}
                prefix="operation-list">
                {data.map(this.renderOperation)}
            </div>
        );
    }

    @Core.bind()
    renderOperation(operation, index) {
        let {key, name, id, machine, items, tools, materials} = operation;

        return (
            <div
                prefix="operation-list__operation"
                key={key}>
                {this.renderLine(
                    'operation',
                    'А' + (index + 1),
                    name + ' ' + id
                )}
                {this.renderLine(
                    'machine',
                    'Б',
                    machine.name + ' ' + machine.id
                )}
                {items.map((item, index) => this.renderLine(
                    'item',
                    'О' + (index + 1),
                    item.text
                ))}
                {this.renderLine(
                    'tool',
                    'Т',
                    tools.map(i => i.name + ' ' + i.grade).join(', ') + '.'
                )}
                {this.renderLine(
                    'material',
                    'М',
                    materials.map(i => i.name + ' ' + i.grade).join(', ') + '.')
                }
            </div>
        );
    }

    renderLine(modifier, mark, content) {
        return content ? (
            <div
                prefix="operation-list__line"
                modifiers={{[modifier]: true}}
                key={mark}>
                <div prefix="operation-list__mark">
                    {mark}
                </div>
                <div prefix="operation-list__text">
                    {content}
                </div>
            </div>
        ) : null;
    }
}