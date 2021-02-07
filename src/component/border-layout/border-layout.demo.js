import Core from 'core';
import Demo from 'demo';
import BorderLayout from './border-layout';
import 'index.scss';

class BorderLayoutDemo extends Core.Component {

    @Core.state(() => ({
        leftCollapsed: false,
        rightCollapsed: false
    }))
    renderComponent() {
        return (
            <div>
                <input
                    type="button"
                    value="Left"
                    onClick={() => {
                        this.setState({
                            leftCollapsed: !this.state.leftCollapsed
                        });
                    }}/>
                <input
                    type="button"
                    value="Right"
                    onClick={() => {
                        this.setState({
                            rightCollapsed: !this.state.rightCollapsed
                        })
                    }}/>
                <BorderLayout {...this.state}
                    left={() => 'left'}
                    center={() => 'center'}
                    right={() => 'right'}/>
            </div>
        );
    }
}

Core.render(
    <Demo title="BorderLayout">
        <Demo.Item title="Default">
            <BorderLayoutDemo/>
        </Demo.Item>
    </Demo>
);