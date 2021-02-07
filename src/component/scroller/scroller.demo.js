import Core from 'core';
import Demo from 'demo';
import Scroller from './scroller';
import 'index.scss';

let items = [],
    style = {
        width: '200px',
        height: '400px',
        border: '1px solid black'
    };

for (let i = 0; i < 500; i++) {
    items[i] = (
        <div key={i + ''}>{'Item-' + i}</div>
    );
}

class ScrollerDemo extends Core.Component {

    @Core.state(() => ({
        page: undefined
    }))
    renderComponent() {
        let {page} = this.state;

        return (
            <Scroller
                style={style}
                length={items.length}
                page={page}
                onPageChange={this.handleLoad}>
                {items.slice(0, 5 + (page || 0) * 20)}
            </Scroller>
        )
    }

    @Core.bind()
    handleLoad({page}) {
        console.log('page', page);
        this.setState({page});
    }
}

Core.render(
    <Demo title="Scroller">
        <Demo.Item title="Default">
            <ScrollerDemo/>
        </Demo.Item>
    </Demo>
);