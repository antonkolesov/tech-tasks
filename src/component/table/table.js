import Core from 'core';
import Types from 'types';
import Dropdown from 'component/dropdown';
import Menu from 'component/menu';
import Scroller from 'component/scroller';
import './table.scss';

export default class Table extends Core.Component {

    @Core.pure(
        false
    )
    @Core.props({
        group: 'own',
        include: [
            'columns',
            'infinite',
            'data',
            'page',
            'sort',
            'innerSort',
            'renderColumn',
            'renderCell',
            'onSortChange',
            'onRowClick'
        ]
    })
    @Core.defaults({
        columns: [],
        data: [],
        sort: {},
        renderColumn: text => text,
        renderCell: value => value
    })
    @Core.innerRefs(
        'body',
        'root'
    )
    @Core.types({
        columns: Types.array,
        infinite: Types.bool,
        data: Types.array,
        sort: Types.exact({
            sort: Types.string,
            order: Types.string
        }),
        innerSort: Types.bool,
        renderColumn: Types.func,
        renderCell: Types.func,
        onSortChange: Types.func,
        onRowClick: Types.func
    })
    renderComponent() {
        let {data, infinite, page} = this.own;

        if (infinite) {
            let len = data.length;

            this.data = data.slice(0, 60 + (page || 0) * 30);

            return (
                <Scroller {...this.rest}
                    prefix="table"
                    page={page}
                    hasMore={this.data.length < len}
                    onClick={this.handleClick}>
                    {this.renderTable()}
                </Scroller>
            );
        } else {
            this.data = data;

            return (
                <div {...this.rest}
                    prefix="table">
                    {this.renderTable()}
                </div>
            );
        }
    }

    renderTable() {
        return (
            <table prefix="table__table">
                {this.renderHeader()}
                {this.renderBody()}
            </table>
        );
    }

    renderHeader() {
        let {columns, renderColumn} = this.own;

        columns = columns.map(column => {
            let {key, text, sortable} = column;
            return (
                <td
                    prefix="table__column"
                    key={key}>
                    <div prefix="table__column-content">
                        <div prefix="table__column-text">
                            {renderColumn(text, column)}
                        </div>
                        {sortable && this.renderColumnDropdown(column)}
                    </div>
                </td>
            );
        });

        return (
            <thead prefix="table__header">
                <tr prefix="table__header-row">{columns}</tr>
            </thead>
        );
    }

    renderColumnDropdown(column) {
        let {sort, order} = this.own.sort,
            {key} = column,
            items = [{
                key: key + ':asc',
                icon: 'sort-ascending',
                text: 'По возрастанию'
            }, {
                key: key + ':desc',
                icon: 'sort-descending',
                text: 'По убыванию'
            }],
            value;

        if (key === sort) {
            value = key + ':' + order;
        }

        return (
            <Dropdown
                prefix="table__column-dropdown"
                onPopoverRequestClose={this.handleRequestClose}>
                <Menu
                    prefix="table__column-menu"
                    orientation="vertical"
                    items={items}
                    value={value}
                    onChange={this.handleColumnChange}/>
            </Dropdown>
        );
    }

    renderBody() {
        let {columns, innerSort, renderCell} = this.own,
            {bodyRef} = this.innerRefs,
            data = innerSort ? this.getSortedData() : this.data,
            rows = [], cells;

        for (let i = 0; i < data.length; i++) {
            let record = data[i],
                key = (typeof record === 'object' ? record.key : i) + '';

            rows[i] = (
                <tr
                    prefix="table__row"
                    record-key={key}
                    key={key}>
                    {cells = []}
                </tr>
            );

            for (let j = 0; j < columns.length; j++) {
                let {key, render} = columns[j];

                cells[j] = (
                    <td
                        prefix="table__cell"
                        key={j}>
                        {renderCell(render ? render(record) : record[key], record, columns[j])}
                    </td>
                );
            }
        }

        return (
            <tbody
                prefix="table__body"
                innerRef={bodyRef}>
                {rows}
            </tbody>
        );
    }

    @Core.bind()
    handleColumnChange(data) {
        let {event, value} = data,
            [sort, order] = value.split(':');
        
        this.requestClose = true;

        this.fire('onSortChange', {event, values: {sort, order}});
    }

    @Core.bind()
    handleClick({target}) {
        let {bodyEl} = this.innerRefs,
            {documentElement} = document;
        
        while (target !== bodyEl && target !== documentElement) {
            if (target.tagName === 'TR') {
                let recordKey = target.getAttribute('record-key');
                
                if (recordKey) {
                    this.fire('onRowClick', {
                        recordKey: +recordKey
                    });
                }
            }
            target = target.parentNode;
        }
    }

    @Core.bind()
    handleRequestClose() {
        if (this.requestClose) {
            this.requestClose = false;
            return true;
        }
    }

    getSortedData() {
        let {data} = this,
            {sort, order} = this.own.sort,
            sign = order === 'asc' ? 1 : -1;

        return [].concat(data).sort((a, b) => (a[sort] > b[sort] ? 1 : -1) * sign);
    }
}