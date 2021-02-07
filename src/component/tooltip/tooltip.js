import Core from 'core';
import Types from 'types';
import './tooltip.scss';

export default class Tooltip extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'trigger',
            'data'
        ]
    })
    @Core.innerRefs(
        'trigger',
        'tooltip'
    )
    @Core.state(() => {
        return {isShow: false};
    })
    @Core.types({
        trigger: Types.func,
        data: Types.any
    })
    renderComponent() {
        let {children} = this.rest,
            {trigger, data} = this.own,
            {triggerRef, tooltipRef} = this.innerRefs,
            {isShow} = this.state;

        trigger = trigger({
            innerRef: triggerRef,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseMove: this.handleMouseMove
        });

        return <>
            {trigger}
            {isShow && Core.createPortal(
                <div {...this.rest}
                    prefix="tooltip"
                    innerRef={tooltipRef}>
                    {typeof children === 'function' ? children({data}) : children}
                </div>,
                document.body
            )}
        </>;
    }

    @Core.bind()
    handleMouseEnter(event) {
        this.pointer = {
            sx: event.clientX,
            sy: event.clientY
        };
        this.setTimeout();
    }

    @Core.bind()
    handleMouseLeave() {
        this.clearTimeout();
    }

    @Core.bind()
    handleMouseMove(event) {
        if (this.pointer) {
            let {clientX, clientY} = event,
                {pointer} = this;

            let len = Math.sqrt(Math.pow(clientX - pointer.sx, 2) + Math.pow(clientY - pointer.sy, 2));
            
            if (len > 10) {
                clearTimeout(this.timeout);

                if (!this.state.isShow) {
                    this.setTimeout();
                    pointer.sx = clientX;
                    pointer.sy = clientY;
                } else {
                    this.clearTimeout();
                }
            }

            pointer.x = clientX;
            pointer.y = clientY;
        }
    }

    @Core.bind()
    handleAfterRender() {
        let {isShow} = this.state;

        if (isShow) {
            let {pointer} = this,
                {tooltipRef} = this.innerRefs;

            Object.assign(tooltipRef.current.style, {
                left: pointer.x + 12 + 'px',
                top: pointer.y + 22 + 'px'
            });
        }
    }

    @Core.bind()
    handleBeforeUnmount() {
        this.clearTimeout();
    }

    setTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.setState({
                isShow: true
            });
        }, 600);
    }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        
        if (this.state.isShow) {
            this.setState({
                isShow: false
            });
        }
    }
}