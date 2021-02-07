import Core from 'core';
import Types from 'types';
import Button from 'component/button';
import MediaQuery from 'component/media-query';
import Dropdown from 'component/dropdown';
import DatePicker from 'component/date-picker';
import './date-pagination.scss';

let dateFns = {
        date: (date, step) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + step),
        month: (date, step) => new Date(date.getFullYear(), date.getMonth() + step, 1),
        year: (date, step) => new Date(date.getFullYear() + step, 0, 1)
    },
    dateFormats = {
        date: 'd M',
        month: 'M Y',
        year: 'Y'
    };

export default class DatePagination extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'date',
            'range',
            'siblingPages',
            'onChange'
        ]
    }, {
        group: 'datePicker',
        include: [
            'date:value',
            'range:mode'
        ]
    })
    @Core.defaults({
        siblingPages: 2,
        range: 'date'
    })
    @Core.state(() => ({
        changing: null
    }))
    @Core.types({
        date: Types.instanceOf(Date).isRequired,
        range: Types.oneOf(['date', 'month', 'year']),
        siblingPages: Types.number,
        onChange: Types.func
    })
    renderComponent() {
        return (
            <MediaQuery
                onInitialize={this.handleInitialize}
                onResize={this.handleResize}>
                {this.renderChildren}
            </MediaQuery>
        );
    }

    @Core.bind()
    renderChildren(mediaQuery) {
        let {mode} = mediaQuery;

        if (mode === null) {
            return (
                <div {...mediaQuery}
                    prefix="date-pagination">
                    <Button
                        prefix="date-pagination__first"
                        icon="chevron-double-left"/>
                    <Button
                        prefix="date-pagination__item"
                        modifiers={{date: true}}
                        text="date"/>
                    <Button
                        prefix="date-pagination__item"
                        modifiers={{month: true}}
                        text="month"/>
                    <Button
                        prefix="date-pagination__item"
                        modifiers={{year: true}}
                        text="year"/>
                </div>
            );
        }
            
        let {date, range} = this.own,
            {changing} = this.state,
            dateFormat = dateFormats[range],
            itemWidth = this.mediaProps[range],
            scrollerStyle = {
                width: itemWidth * (mode * 2 + 1) + 'px'
            },
            prevItems = [],
            nextItems = [],
            wrapperStyle = {},
            currentItems;

        if (changing !== null) {
            if (changing > 0) {
                nextItems = this.renderItems(this.currentDate, mode + 1, changing);
            } else {
                prevItems = this.renderItems(this.currentDate, -mode + changing, -changing);
                wrapperStyle.marginLeft = changing * itemWidth + 'px';
            }

            wrapperStyle.transform = 'translateX(' + (-changing * itemWidth) + 'px)';

            currentItems = this.currentItems;
        } else {
            this.currentDate = date;
            currentItems = this.currentItems = <>
                {this.renderItems(date, -mode, mode)}
                <Dropdown
                    prefix="date-pagination__current"
                    modifiers={{[range]: true}}
                    key="current"
                    text={Core.formatDate(date, dateFormat)}
                    arrow={null}
                    popoverPosition="top-center"
                    onPopoverRequestClose={this.handleRequestClose}>
                    <DatePicker {...this.datePicker}
                        prefix="date-pagination__date-picker"
                        onChange={this.handleDatePickerChange}/>
                </Dropdown>
                {this.renderItems(date, 1, mode)}
            </>
        }

        return (
            <div {...this.rest} {...mediaQuery}
                prefix="date-pagination"
                modifiers={{changing: !!changing}}
                onClick={this.handleClick}>
                <Button
                    prefix="date-pagination__first"
                    key="first"
                    icon="chevron-double-left"
                    new-date={-(mode * 2 + 1)}/>
                <Button
                    prefix="date-pagination__prev"
                    key="prev"
                    icon="chevron-left"
                    new-date={-1}/>
                <div
                    prefix="date-pagination__scroller"
                    style={scrollerStyle}>
                    <div
                        prefix="date-pagination__wrapper"
                        style={wrapperStyle}
                        onTransitionEnd={this.handleTransitionEnd}>
                        {prevItems}
                        {currentItems}
                        {nextItems}
                    </div>
                </div>
                <Button
                    prefix="date-pagination__next"
                    key="next"
                    icon="chevron-right"
                    new-date={1}/>
                <Button
                    prefix="date-pagination__last"
                    key="last"
                    icon="chevron-double-right"
                    new-date={mode * 2 + 1}/>
                <div
                    prefix="date-pagination__frame"
                    modifiers={{[range]: true}}/>
            </div>
        );
    }

    renderItems(date, from, count) {
        let {range} = this.own,
            dateFn = dateFns[range],
            dateFormat = dateFormats[range],
            items = [];
        
        for (let i = 0; i < count; i++) {  
            let key = i + from;

            items.push(
                <Button
                    prefix="date-pagination__item"
                    modifiers={{[range]: true}}
                    key={key}
                    new-date={key}
                    text={Core.formatDate(dateFn(date, key), dateFormat)}/>
            );
        }

        return items;
    }

    @Core.bind()
    handleClick(event) {
        let newDate = event.target.getAttribute('new-date'),
            {date, range} =  this.own;

        if (newDate) {
            newDate = +newDate;

            this.setState({changing: newDate});

            this.fire('onChange', {
                value: dateFns[range](date, newDate)
            });
        }
    }

    @Core.bind()
    handleDatePickerChange({value}) {
        this.requestClose = true;
        this.fire('onChange', {value});
    }

    @Core.bind()
    handleInitialize(event) {
        let [icon, date, month, year] = Array.prototype.slice.call(event.rootEl.children).map(i => i.offsetWidth);
        this.mediaProps = {icon, date, month, year};
    }

    @Core.bind()
    handleResize(event) {
        let {mediaProps} = this,
            {clientWidth} = event,
            {range} = this.own,
            icon = mediaProps.icon,
            item = mediaProps[range],
            mode = Math.floor((clientWidth - 4 * icon - 50) / item);
        
        if (!(mode % 2)) {
            mode--;
        }

        mode = Math.floor(mode / 2);

        return mode;
    }

    @Core.bind()
    handleRequestClose() {
        if (this.requestClose) {
            this.requestClose = false;
            return true;
        }
    }

    @Core.bind()
    handleTransitionEnd() {
        this.setState({changing: null});
    }
}