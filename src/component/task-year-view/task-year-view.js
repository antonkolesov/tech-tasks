import Core from 'core';
import Types from 'types';
import Grid from 'component/grid';
import MonthGrid from 'component/month-grid';
import MediaQuery from 'component/media-query';
import Tooltip from 'component/tooltip';
import './task-year-view.scss';

let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    typeItems = [{
        key: 'create',
        text: 'Создать'
    }, {
        key: 'update',
        text: 'Изменить'
    }, {
        key: 'destroy',
        text: 'Удалить'
    }],
    stateItems = [{
        key: 'todo',
        text: 'Выполнить'
    }, {
        key: 'doing',
        text: 'Выполняется'
    }, {
        key: 'done',
        text: 'Выполнено'
    }];

export default class TaskYearView extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'data',
            'date',
            'onPathChange'
        ]
    })
    @Core.types({
        data: Types.arrayOf(Types.task),
        date: Types.instanceOf(Date),
        onPathChange: Types.func
    })
    renderComponent() {
        return (
            <MediaQuery
                onResize={this.handleResize}>
                {this.renderChildren}
            </MediaQuery>
        );
    }

    @Core.bind()
    renderChildren(mediaQuery) {
        let {own} = this,
            {mode} = mediaQuery;

        if (mode === null) {
            return (
                <div {...mediaQuery}
                    prefix="task-year-view"/>
            );
        }
        
        own.currentYear = own.date.getFullYear();

        return (
            <Grid {...this.rest} {...mediaQuery}
                prefix="task-year-view"
                data={this.groupData()}
                renderCell={this.renderMonth}
                columnCount={mode}
                onClick={this.handleClick}/>
        );
    }

    @Core.bind()
    renderMonth(data, index) {
        let {currentYear} = this.own;

        return <>
            <div
                prefix="task-year-view__month-header"
                data-key={index + ''}>
                {monthNames[index]}
            </div>
            <div prefix="task-year-view__month-body">
                <MonthGrid
                    prefix="task-year-view__month-grid"
                    date={new Date(currentYear, index, 1)}
                    data={data}
                    renderCell={this.renderCell}/>
            </div>
        </>;
    }

    @Core.bind()
    renderCell(dt, data) {
        let month = dt.getMonth(),
            date = dt.getDate(),
            btnProps = {
                prefix: 'task-year-view__date',
                'data-key': month + '-' + date,
                children: <>
                    {date}
                    {this.renderDots(data)}
                </>
            };

        return data ? (
            <Tooltip
                trigger={tltProps => <div {...btnProps} {...tltProps}/>}
                data={data}>
                {this.renderTooltip}
            </Tooltip>
        ) : (
            <div {...btnProps}/>
        );
    }

    @Core.bind()
    renderTooltip({data}) {

        return (
            <div prefix="task-year-view__tooltip">
                {typeItems.map(i => this.renderTooltipItem(i, data[i.key]))}
                <div prefix="task-year-view__tooltip-divider"/>
                {stateItems.map(i => this.renderTooltipItem(i, data[i.key]))}
            </div>
        );
    }

    renderTooltipItem(props, value) {
        return (
            <div
                prefix="task-year-view__tooltip-item"
                key={props.key}>
                <div prefix="task-year-view__tooltip-item-text">
                    {props.text}
                </div>
                <div prefix="task-year-view__tooltip-item-value">
                    {value || 0}
                </div>
            </div>
        );
    }

    renderDots(data = {}) {
        return (
            <div prefix="task-year-view__dots">
                {['create', 'update', 'destroy'].map(i => (
                    data[i] ? (
                        <div
                            prefix="task-year-view__dot"
                            key={i}
                            modifiers={{[i]: true}}/>
                    ) : null
                ))}
            </div>
        );
    }

    groupData() {
        let {currentYear, data} = this.own,
            groupedData = [];

        for (let i = 0; i < 12; i++) {
            groupedData[i] = [];
        }

        data.forEach(i => {
            let created = new Date(i.created),
                year = created.getFullYear();

            if (currentYear === year) {
                let month = created.getMonth(),
                    date = created.getDate()

                month = groupedData[month];
                date = month[date] || (month[date] = {});

                date[i.state] = (date[i.state] || 0) + 1;
                date[i.type] = (date[i.type] || 0) + 1;
            }
        });

        return groupedData;
    }

    @Core.bind()
    handleClick(event) {
        let {key} = event.target.dataset;

        if (key) {
            let {date} = this.own;

            key = key.split('-');
            date = new Date(
                date.getFullYear(),
                +key[0],
                key[1] ? +key[1] : 1
            );

            let path;

            if (key.length === 1) {
                path = Core.formatDate(date, 'Y-m');
            } else {
                path = Core.formatDate(date, 'Y-m-d');
            }

            this.fire('onPathChange', {path});
        }
    }

    @Core.bind()
    handleResize(event) {
        let {clientWidth} = event,
            mode = Math.floor(clientWidth / 280) || 1;

        if (mode === 5) {
            mode = 4;
        } else if (mode > 6) {
            mode = 6;
        }

        return mode;
    }
}