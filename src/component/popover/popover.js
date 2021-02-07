import Core from 'core';
import Types from 'types';
import './popover.scss';

let positions = {
    'left-start':    [0.0, 0.0, 1.0, 0.0],
    'left-center':   [0.0, 0.5, 1.0, 0.5],
    'left-end':      [0.0, 1.0, 1.0, 1.0],
    'right-start':   [1.0, 0.0, 0.0, 0.0],
    'right-center':  [1.0, 0.5, 0.0, 0.5],
    'right-end':     [1.0, 1.0, 0.0, 1.0],
    'top-start':     [0.0, 0.0, 0.0, 1.0],
    'top-center':    [0.5, 0.0, 0.5, 1.0],
    'top-end':       [1.0, 0.0, 1.0, 1.0],
    'bottom-start':  [0.0, 1.0, 0.0, 0.0],
    'bottom-center': [0.5, 1.0, 0.5, 0.0],
    'bottom-end':    [1.0, 1.0, 1.0, 0.0]
};

export default class Popover extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'offset',
            'offsetX',
            'offsetY',
            'position',
            'trigger',
            'fit',
            'onRequestClose'
        ]
    })
    @Core.defaults({
        offset: 0,
        position: 'bottom-start'
    })
    @Core.innerRefs(
        'trigger',
        'popover'
    )
    @Core.statics({
        popover: null
    })
    @Core.state(() => ({
        isVisible: false
    }))
    @Core.types({
        position: Types.oneOf(Object.keys(positions)),
        trigger: Types.func,
        fit: Types.oneOfType([
            Types.oneOf(['trigger']),
            Types.ref
        ]),
        onRequestClose: Types.func
    })
    renderComponent() {
        let {trigger} = this.own,
            {triggerRef, popoverRef} = this.innerRefs,
            {isVisible} = this.state;

        return <>
            {trigger({
                'data-popover-trigger': true,
                innerRef: triggerRef,
                onClick: this.handleToggle
            })}
            <Core.Transition
                in={isVisible}
                timeout={120}
                mountOnEnter
                unmountOnExit>
                {transition => (
                    Core.createPortal(
                        <div {...this.rest}
                            prefix="popover"
                            modifiers={{transition}}
                            innerRef={popoverRef}
                            data-popover-popup={true}
                            onClick={this.handleClick}/>,
                        document.querySelector('.viewport') || document.body
                    )
                )}
            </Core.Transition>
        </>
    }

    @Core.bind()
    handleShow() {
        this.handleHide();

        this.constructor.popover = this;

        this.setState({
            isVisible: true
        });
    }

    @Core.bind()
    handleHide() {
        let {constructor} = this,
            {popover} = constructor;

        if (popover) {
            popover.setState({
                isVisible: false
            });

            constructor.popover = null;
        }
    }

    @Core.bind()
    handleToggle() {
        let {popover} = this.constructor;

        if (popover === this) {
            this.handleHide();
        } else {
            this.handleShow();
        }
    }

    @Core.bind()
    handleAfterRender() {
        if (!this.state.isVisible) return;

        let {fit, position, offset, offsetX, offsetY} = this.own,
            {triggerEl, popoverEl} = this.innerRefs,
            popoverRect = popoverEl.getBoundingClientRect(),
            triggerRect = triggerEl.getBoundingClientRect(),
            {width, height} = popoverRect,
            left, top,
            [a, b, c, d] = positions[position];

        if (typeof offsetX !== 'number') {
            offsetX = offset;
        }

        if (typeof offsetY !== 'number') {
            offsetY = offset;
        }

        if (fit) {
            let fitRect = fit === 'trigger' ? triggerRect : fit.current.getBoundingClientRect();

            if (width < fitRect.width) {
                width = fitRect.width - 2;
            }
        }

        left = triggerRect.left + triggerRect.width * a - width * c + 1;
        top = triggerRect.top + triggerRect.height * b - height * d + offsetY;

        let {clientWidth} = document.body;

        if (left + width > clientWidth) {
            left = left - width + triggerRect.width - offsetX;
        } else {
            left += offsetX;
        }

        Object.assign(popoverEl.style, {
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px'
        });
    }

    @Core.bind()
    handleBeforeUnmount() {
        let {constructor} = this;

        if (constructor.popover === this) {
            constructor.popover = null;
        }
    }

    @Core.bind()
    handleClick(event) {
        if (this.fire('onRequestClose', event)) {
            this.handleHide();
        }
    }
}

addEventListener('mousedown', event => {
    let {target} = event;

    while (target && target !== document.documentElement) {
        let {popoverTrigger, popoverPopup} = target.dataset;
        
        if (popoverTrigger || popoverPopup) {
            return;
        }

        target = target.parentNode;
    }

    Popover.prototype.handleHide();
});

addEventListener('mousewheel', event => {
    let {target} = event;

    while (target !== document.documentElement) {
        let {popoverPopup} = target.dataset;
        
        if (popoverPopup) {
            return;
        }

        target = target.parentNode;
    }

    Popover.prototype.handleHide();
});

addEventListener('resize', () => {
    Popover.prototype.handleHide();
});