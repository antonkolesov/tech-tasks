import Core from 'core';
import Types from 'types';
import Icon from 'component/icon';
import Draggable from 'component/draggable';
import Manager from 'component/popup/manager';
import './popup.scss';

let resizeProps = {
        none: [],
        horizontal: ['left', 'right'],
        vertical: ['top', 'bottom'],
        all: ['left', 'right', 'top', 'bottom']
    },
    resizeHandles = {
        left: ['width', 'dx', -1],
        right: ['width', 'dx', 1],
        top: ['height', 'dy', -1],
        bottom: ['height', 'dy', 1]
    };

export default class Popup extends Core.Component {

    @Core.pure(
        false
    )
    @Core.props({
        group: 'own',
        include: [
            'closable',
            'transparent',
            'popupKey',
            'resize',
            'title',
            'onClose',
            'onResize'
        ]
    })
    @Core.defaults({
        closable: true
    })
    @Core.statics({
        Manager,
        open: Manager.open,
        close: Manager.close
    })
    @Core.innerRefs(
        'root',
        'overlay'
    )
    @Core.state(() => ({
        inProp: true
    }))
    @Core.types({
        closable: Types.bool,
        transparent: Types.bool,
        popupKey: Types.string,
        resize: Types.oneOfType([
            Types.oneOf(['none', 'horizontal', 'vertical', 'all']),
            Types.arrayOf(
                Types.oneOf(['left', 'right', 'top', 'bottom'])
            )
        ]),
        title: Types.node,
        onClose: Types.func,
        onResize: Types.func
    })
    renderComponent() {
        let {inProp} = this.state;

        return (
            <Core.Transition
                in={inProp}
                timeout={120}
                appear={true}
                mountOnEnter={true}
                unmountOnExit={true}
                onExited={this.handleExited}>
                {this.renderPopup}
            </Core.Transition>
        );
    }

    @Core.bind()
    renderPopup(transition) {
        let {closable, transparent, resize, title} = this.own,
            {children} = this.rest,
            {overlayRef, rootRef} = this.innerRefs,
            style={};

        if (resize) {
            if (!this.rect) {
                let {popupKey} = this.own,
                    [width, height] = (localStorage.getItem(popupKey + ':rect') || '-:-').split(':').map(
                        i => i === '-' ? undefined : +i
                    );
                this.rect = {width, height};
            }
    
            let {width, height} = this.rect;
    
            if (width !== undefined) {
                style.width = width + 'px';
            }
    
            if (height !== undefined) {
                style.height = height + 'px';
            }
        }

        if (typeof children === 'function') {
            children = children({
                handleClose: this.handleClose
            });
        }

        return (
            <div
                prefix="popup__overlay"
                modifiers={{transparent}}
                innerRef={overlayRef}
                onMouseDown={this.handleMouseDown}>
                <div {...this.rest}
                    prefix="popup"
                    modifiers={{transition}}
                    innerRef={rootRef}
                    style={style}>
                    <div prefix="popup__header">
                        <div prefix="popup__title">
                            {title}
                        </div>
                        {closable && (
                            <Icon
                                prefix="popup__close-button"
                                name="window-close"
                                onClick={this.handleClose}/>
                        )}
                    </div>
                    <div prefix="popup__body">
                        {children}
                    </div>
                    {resize && this.renderResizeHandles()}
                </div>
            </div>
        );
    }

    renderResizeHandles() {
        let {resize} = this.own;

        if (typeof resize === 'string') {
            resize = resizeProps[resize];
        }

        return <>
            {resize.map(i => (
                <Draggable
                    key={i}
                    onDragStart={this.handleResizeStart}
                    onDrag={this.handleResize}
                    onDragEnd={this.handleResizeEnd}>
                    {props => (
                        <div {...props}
                            prefix="popup__resize"
                            modifiers={{[i]: true}}
                            data-key={i}/>
                    )}
                </Draggable>
            ))}
        </>;
    }

    @Core.bind()
    handleClose() {
        this.fire('onClose');
        this.setState({inProp: false});
    }

    @Core.bind()
    handleResizeStart(event) {
        let {key} = event.el.dataset,
            {rootEl} = this.innerRefs,
            {width, height} = rootEl.getBoundingClientRect();

        Object.assign(event, {
            key: key,
            width: width,
            height: height
        });
    }

    @Core.bind()
    handleResize(event) {
        let [a, b, c] = resizeHandles[event.key],
            size = this.rect[a] = event[a] + (event[b] * c * 2);

        this.innerRefs.rootEl.style[a] = size + 'px';

        this.fire('onResize', event);
    }

    @Core.bind()
    handleResizeEnd() {
        let {width, height} = this.rect,
            {popupKey} = this.own;

        localStorage.setItem(
            popupKey + ':rect',
            (width === undefined ? '-' : width.toString()) + ':' + (height === undefined ? '-' : height.toString())
        );
    }

    @Core.bind()
    handleExited() {
        let {popupKey} = this.own;
        
        Manager.close(popupKey);
    }

    @Core.bind()
    handleMouseDown(event) {
        let {target} = event,
            {overlayEl} = this.innerRefs,
            {closable} = this.own;

        if (closable && target === overlayEl) {
            this.handleClose();
        }
    }
}