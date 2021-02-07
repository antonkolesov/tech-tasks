import Core from 'core';
import Types from 'types';
import './media-query.scss';

let {Provider, Consumer} = Core.createContext(),
    rootComponent = {
        components: []
    };

function _notify() {
    rootComponent.components.forEach(i => i.notify());
}

addEventListener('resize', _notify);

export default class MediaQuery extends Core.Component {

    static notify() {
        _notify();
    }

    @Core.pure(
        false
    )
    @Core.props({
        group: 'own',
        include: [
            'onResize',
            'onInitialize'
        ]
    })
    @Core.state(() => ({
        mode: null
    }))
    @Core.innerRefs(
        'root'
    )
    @Core.types({
        onResize: Types.func,
        onInitialize: Types.func
    })
    renderComponent() {
        return (
            <Consumer>
                {this.renderChildren}
            </Consumer>
        );
    }

    @Core.bind()
    renderChildren(value) {
        let {mode} = this.state,
            {children} = this.rest,
            {rootRef} = this.innerRefs,
            props = {mode, innerRef: rootRef, notify: this.notify};

        this.parentComponent = value ? value.parentComponent : rootComponent;

        Object.defineProperty(props, 'mode', {enumerable: false});
        Object.defineProperty(props, 'notify', {enumerable: false});

        return (
            <Provider value={{parentComponent: this}}>
                {children(props)}
            </Provider>
        );
    }

    @Core.bind()
    notify() {
        let {mode} = this.state,
            newMode = this.handleResize();

        if (mode !== newMode) {
            this.setState({mode: newMode});
        }

        (this.components || []).forEach(i => i.notify());
    }

    @Core.bind()
    handleAfterMount() {
        let {parentComponent} = this;
        (parentComponent.components || (parentComponent.components = [])).push(this);
    }

    @Core.bind()
    handleBeforeUnmount() {
        let {parentComponent} = this;
        parentComponent.components = parentComponent.components.filter(i => i !== this);
    }

    @Core.bind()
    handleAfterRender() {
        let {mode} = this.state;

        if (mode === null) {
            this.fire('onInitialize', this.getEventProps());
        }

        let newMode = this.handleResize();

        if (newMode === undefined) {
            newMode = null;
        }
        
        if (mode !== newMode) {
            this.setState({mode: newMode});
        }
    }

    @Core.bind()
    handleResize() {
        let mode = this.fire('onResize', this.getEventProps());

        if (mode === undefined) {
            mode = null;
        }

        return mode;
    }

    getEventProps() {
        let {rootEl} = this.innerRefs,
            {clientWidth, clientHeight} = rootEl;

        return {rootEl, clientWidth, clientHeight};
    }
}