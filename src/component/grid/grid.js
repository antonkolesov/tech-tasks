import Core from 'core';
import Types from 'types';
import Scroller from 'component/scroller';
import './grid.scss';

export default class Grid extends Core.Component {

    @Core.pure(
        false
    )
    @Core.props({
        group: 'own',
        include: [
            'columnCount',
            'data',
            'infinite',
            'page',
            'renderCell'
        ]
    })
    @Core.defaults({
        columnCount: 3,
        data: [],
        renderCell: record => record.text
    })
    @Core.types({
        columnCount: Types.number,
        data: Types.array,
        infinite: Types.bool,
        page: Types.number,
        renderCell: Types.func
    })
    renderComponent() {
        let {columnCount, data, infinite, page, renderCell} = this.own,
            rows = [],
            rest,
            grid,
            cells,
            index;

        if (infinite) {
            let len = data.length;

            data = data.slice(0, 30 + (page || 0) * 30);

            grid = (
                <Scroller {...this.rest}
                    prefix="grid"
                    page={page}
                    hasMore={data.length < len}>
                    {rows}
                </Scroller>
            );
        } else {

            grid = (
                <div {...this.rest}
                    prefix="grid">
                    {rows}
                </div>
            );
        }

        for (let i = 0; i < data.length; i++) {
            index = i % columnCount;
            
            if (!index) {
                rows.push(
                    <div
                        prefix="grid__row"
                        key={rows.length}>
                        {cells = []}
                    </div>
                );
            }

            cells.push(
                <div
                    prefix="grid__cell"
                    key={cells.length}>
                    {renderCell(data[i], i)}
                </div>
            );
        }

        rest = rows.length * columnCount - data.length;

        for (let i = 0; i < rest; i++) {
            cells.push(
                <div
                    prefix="grid__rest"
                    key={cells.length}/>
            );
        }

        return grid;
    }
}