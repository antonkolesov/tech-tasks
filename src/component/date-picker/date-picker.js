import Core from 'core';
import Types from 'types';
import Menu from 'component/menu';
import './date-picker.scss';

let panelIds = {
    date: 0,
    month: 1,
    year: 2
};

export default class DatePicker extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'dayNames',
            'firstDay',
            'mode',
            'monthNames',
            'value',
            'onChange'
        ]
    })
    @Core.defaults({
        value: new Date(),
        mode: 'date',
        firstDay: 1,
        dayNames: Core.locale.dayNames,
        monthNames: Core.locale.monthNames
    })
    @Core.state(props => {
        return {
            displayValue: new Date(props.value),
            activeItem: 0
        }
    })
    @Core.types({
        dayNames: Types.array,
        firstDay: Types.number,
        mode: Types.oneOf(['date', 'month', 'year']),
        monthNames: Types.array,
        value: Types.instanceOf(Date),
        onChange: Types.func
    })
    renderComponent() {
        let {value} = this.own,
            now = new Date(),
            to = this.state.displayValue.getFullYear(),
            from = to - to % 20;

        Object.assign(this.own, {
            nowValue: {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate()
            },
            selectedValue: {
                year: value.getFullYear(),
                month: value.getMonth(),
                date: value.getDate()
            },
            yearRange: {
                from,
                to: from + 19
            }
        });

        return (
            <div {...this.rest}
                prefix="date-picker">
                {this.renderHeader()}
                <div
                    prefix="date-picker__body"
                    onClick={this.handleBodyClick}>
                    {this.renderBody()}
                </div>
            </div>
        );
    }

    renderHeader() {
        let {monthNames, yearRange, mode} = this.own,
            {displayValue, activeItem} = this.state,
            title;

        switch (activeItem + panelIds[mode]) {
            case 0:
                title = monthNames[displayValue.getMonth()] + ' ' + displayValue.getFullYear();
                break;
            case 1:
                title = displayValue.getFullYear();
                break;
            case 2:
                title = yearRange.from + '-' + yearRange.to;
                break;
        }

        let items = [{
            key: 'prev',
            icon: 'chevron-left'
        }, {
            key: 'title',
            text: title
        }, {
            key: 'next',
            icon: 'chevron-right'
        }]
        return (
            <Menu
                prefix="date-picker__header"
                orientation="horizontal"
                items={items}
                onChange={this.handleHeaderClick}/>
        );
    }

    renderBody() {
        let {mode} = this.own,
            {activeItem} = this.state;

        switch (activeItem + panelIds[mode]) {
            case 0:
                return this.renderDatePanel();
            case 1:
                return this.renderMonthPanel();
            case 2:
                return this.renderYearPanel();
        }
    }

    renderDatePanel() {
        let {firstDay, dayNames, nowValue, selectedValue} = this.own,
            {displayValue} = this.state,
            currentValue = new Date(displayValue.getFullYear(), displayValue.getMonth(), 1),
            currentMonth = displayValue.getMonth(),
            offset = -currentValue.getDay() + firstDay + 1,
            columns = [],
            rows = [],
            cells;

        currentValue.setDate(offset > 1 ? offset - 7 : offset);

        for (let i = 0; i < 7; i++) {
            columns[i] = (
                <div
                    prefix="date-picker__date-column"
                    key={i}>
                    {dayNames[(i + firstDay) % 7]}
                </div>
            );
        }

        for (let i = 0; i < 6; i++) {
            rows[i] = (
                <div
                    prefix="date-picker__date-row"
                    key={i}>
                    {cells = []}
                </div>
            );

            for (let j = 0; j < 7; j++) {
                let date = currentValue.getDate(),
                    month = currentValue.getMonth(),
                    year = currentValue.getFullYear(),
                    time = currentValue.getTime();

                cells[j] = (
                    <div
                        prefix="date-picker__date-cell"
                        modifiers={{
                            other: month !== currentMonth,
                            now: date === nowValue.date && month === nowValue.month && year === nowValue.year,
                            selected: date === selectedValue.date && month === selectedValue.month && year === selectedValue.year
                        }}
                        key={j}
                        data-key={'d:' + time}>
                        {date}
                    </div>
                );

                currentValue.setDate(date + 1);
            }
        }

        return (
            <div prefix="date-picker__date-panel">
                <div prefix="date-picker__date-header">
                    {columns}
                </div>
                <div prefix="date-picker__date-body">
                    {rows}
                </div>
            </div>
        );
    }

    renderMonthPanel() {
        let {monthNames, nowValue, selectedValue} = this.own,
            year = this.state.displayValue.getFullYear(),
            columns = [],
            cells;

        for (let i = 0; i < 12; i++) {
            let pos = i % 6;

            if (!pos) {
                columns.push(
                    <div
                        prefix="date-picker__month-column"
                        key={columns.length}>
                        {cells = []}
                    </div>
                );
            }

            cells[pos] = (
                <div
                    prefix="date-picker__month-cell"
                    modifiers={{
                        now: nowValue.month === i && nowValue.year === year,
                        selected: selectedValue.month === i && selectedValue.year === year
                    }}
                    key={i}
                    data-key={'m:' + i}>
                    {monthNames[i]}
                </div>
            );
        }

        return (
            <div prefix="date-picker__month-panel">
                {columns}
            </div>
        );
    }

    renderYearPanel() {
        let {yearRange, nowValue, selectedValue} = this.own,
            currentYear = yearRange.from - 2,
            columns = [],
            cells;

        for (let i = 0; i < 4; i++) {
            columns[i] = (
                <div
                    prefix="date-picker__year-column"
                    key={i}>
                    {cells = []}
                </div>
            );

            for (let j = 0; j < 6; j++) {
                cells[j] = (
                    <div
                        prefix="date-picker__year-cell"
                        modifiers={{
                            other: currentYear < yearRange.from || currentYear > yearRange.to,
                            now: currentYear === nowValue.year,
                            selected: currentYear === selectedValue.year
                        }}
                        key={currentYear}
                        data-key={'y:' + currentYear}>
                        {currentYear}
                    </div>
                );

                currentYear++;
            }
        }

        return (
            <div prefix="date-picker__year-panel">
                {columns}
            </div>
        );
    }

    @Core.bind()
    handleHeaderClick({value}) {
        if (value === 'title') {
            let {mode} = this.own,
                {activeItem} = this.state;

            this.setState({
                activeItem: (activeItem + 1) % (3 - panelIds[mode])
            });
        } else {
            let {mode} = this.own,
                {activeItem, displayValue} = this.state,
                sign = value === 'prev' ? -1 : 1;

            displayValue = new Date(displayValue);

            switch (activeItem + panelIds[mode]) {
                case 0:
                    displayValue.setMonth(displayValue.getMonth() + sign);
                    break;
                case 1:
                    displayValue.setFullYear(displayValue.getFullYear() + sign);
                    break;
                case 2:
                    displayValue.setFullYear(displayValue.getFullYear() + 20 * sign);
                    break;
            }

            this.setState({
                displayValue
            });
        }
    }

    @Core.bind()
    handleBodyClick(event) {
        let {key} = event.target.dataset;

        if (key) {
            let [type, value] = key.split(':'),
                {displayValue, activeItem} = this.state,
                newValue = new Date(displayValue);

            switch (type) {
                case 'd':
                    newValue.setTime(+value)
                    break;
                case 'm':
                    newValue.setMonth(+value);
                    break;
                case 'y':
                    newValue.setFullYear(+value);
                    break;
            }

            if (activeItem > 0) {
                this.setState({
                    displayValue: newValue,
                    activeItem: activeItem - 1
                })
            } else {
                this.fire('onChange', {
                    event,
                    value: newValue
                });
            }
        }
    }
}