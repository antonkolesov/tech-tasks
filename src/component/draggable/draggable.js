import Core from 'core';
import Types from 'types';
import './draggable.scss';

export default class Draggable extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'onDragStart',
            'onDrag',
            'onDragEnd'
        ]
    })
    @Core.innerRefs(
        'root'
    )
    @Core.state(() => {
        return {isDrag: false};
    })
    @Core.types({
        onDragStart: Types.func,
        onDrag: Types.func,
        onDragEnd: Types.func
    })
    renderComponent() {
        let {children} = this.rest,
            {isDrag} = this.state,
            {rootRef} = this.innerRefs;

        children = children({
            innerRef: rootRef,
            onMouseDown: this.handleMouseDown
        });

        if (isDrag) {
            let {cursor} = this.dragProps;

            children = <>
                {children}
                <div
                    prefix="draggable__overlay"
                    style={{cursor}}/>
            </>;
        }

        return children;
    }

    @Core.bind()
    handleMouseDown(event) {
        let {rootEl} = this.innerRefs,
            cursor = getComputedStyle(rootEl).cursor;

        event.preventDefault();

        addEventListener('mousemove', this.handleMouseMove);
        addEventListener('mouseup', this.handleMouseUp);

        this.dragProps = {
            el: rootEl,
            cursor,
            x: event.clientX,
            y: event.clientY,
            dx: 0,
            dy: 0
        };

        this.fire('onDragStart', this.dragProps);

        this.setState({isDrag: true});
    }

    @Core.bind()
    handleMouseMove(event) {
        let {dragProps, innerRefs} = this,
            {rootEl} = innerRefs,
            {x, y} = dragProps;

        dragProps.el = rootEl;
        dragProps.dx = event.clientX - x;
        dragProps.dy = event.clientY - y;

        this.fire('onDrag', this.dragProps);
    }

    @Core.bind()
    handleMouseUp() {
        removeEventListener('mousemove', this.handleMouseMove);
        removeEventListener('mouseup', this.handleMouseUp);

        this.setState({isDrag: false});
        
        this.fire('onDragEnd', this.dragProps);
    }
}