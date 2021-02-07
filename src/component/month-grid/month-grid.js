import Core from 'core';
import Types from 'types';
import './month-grid.scss';

let dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default class MonthGrid extends Core.Component {

    @Core.pure(
        false
    )
    @Core.props({
        group: 'own',
        include: [
            'data',
            'date',
            'dayNames',
            'firstDay',
            'renderCell',
            'renderEmptyCell'
        ]
    })
    @Core.defaults({
        dayNames,
        firstDay: 1,
        data: [],
        renderCell: (date) => date.getDate(),
        renderEmptyCell: () => null
    })
    @Core.types({
        data: Types.array,
        date: Types.instanceOf(Date).isRequired,
        dayNames: Types.array,
        firstDay: Types.number,
        renderCell: Types.func,
        renderEmptyCell: Types.func
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="month-grid">
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }

    renderHeader() {
        let {dayNames} = this.own,
            cells = [];

        for (let i = 0; i < 7; i++) {
            cells[i] = (
                <div
                    prefix="month-grid__day-name"
                    key={i}>
                    {dayNames[(i + 1) % 7]}
                </div>
            );
        }

        return (
            <div prefix="month-grid__header">
                {cells}
            </div>
        );
    }

    renderBody() {
        let {date, data, firstDay, renderCell, renderEmptyCell} = this.own,
            currentMonth = date.getMonth(),
            tempDate = new Date(date.getFullYear(), currentMonth, 1),
            rows = [], cells,
            offset = -tempDate.getDay() + firstDay + 1;

        tempDate.setDate(offset > 1 ? offset - 7 : offset);

        for (let i = 0; i < 6; i++) {
            rows.push(
                <div
                    prefix="month-grid__row"
                    key={i}>
                    {cells = []}
                </div>
            );

            for (let j = 0; j < 7; j++) {
                let date = tempDate.getDate(),
                    month = tempDate.getMonth();

                cells.push(month === currentMonth ? (
                    <div
                        prefix="month-grid__cell"
                        key={j}>
                        {renderCell(tempDate, data[date])}
                    </div>
                ) : (
                    <div
                        prefix="month-grid__empty-cell"
                        key={j}>
                        {renderEmptyCell()}
                    </div>
                ));

                tempDate.setDate(date + 1);
            }
        }

        return (
            <div prefix="month-grid__body">
                {rows}
            </div>
        );
    }
}