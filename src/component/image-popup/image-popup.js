import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Menu from 'component/menu';
import MediaQuery from 'component/media-query';
import LoadingOverlay from 'component/loading-overlay';
import './image-popup.scss';

let menuItems = [{
        key: 'scalePlus',
        icon: 'plus-circle-outline',
        title: 'Увеличить масштаб'
    }, {
        key: 'scaleMinus',
        icon: 'minus-circle-outline',
        title: 'Уменьшить масштаб'
    }, {
        key: 'scaleFit',
        icon: 'fit-to-page-outline',
        title: 'Подогнать по размеру окна'
    }, {
        key: 'rotateLeft',
        icon: 'rotate-left',
        title: 'Повернуть против часовой стрелки'
    }, {
        key: 'rotateRight',
        icon: 'rotate-right',
        title: 'Повернуть по часовой стрелке'
    }, {
        key: 'flipHorizontal',
        icon: 'flip-horizontal',
        title: 'Отразить горизонтально'
    }, {
        key: 'flipVertical',
        icon: 'flip-vertical',
        title: 'Отразить вертикально'
    }]

export default class ImagePopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'src'
    })
    @Core.innerRefs(
        'content',
        'image'
    )
    @Core.state(() => ({
        loading: true
    }))
    @Core.types({
        src: Types.string.isRequired
    })
    renderComponent() {
        return (
            <Popup {...this.rest}
                prefix="image-popup"
                resize="all"
                onResize={this.handleResize}>
                {this.renderImageViewer}
            </Popup>
        );
    }

    @Core.bind()
    renderImageViewer() {
        let {src} = this.own,
            {loading} = this.state,
            {imageRef, contentRef} = this.innerRefs,
            imageStyle,
            loadingOverlay,
            menuDisabled;

        if (loading) {
            loadingOverlay = <LoadingOverlay prefix="image-popup__loading-overlay"/>;
            menuDisabled = true;
        } else {
            imageStyle = this.getStyle();
        }

        return (
            <MediaQuery onResize={this.handleResize}>
                {media => (
                    <div {...media}
                        prefix="image-popup__viewer">
                        <div
                            prefix="image-popup__content"
                            innerRef={contentRef}
                            onWheel={this.handleWheel}>
                            <img
                                prefix="image-popup__image"
                                modifiers={{loading}}
                                src={src}
                                style={imageStyle}
                                innerRef={imageRef}
                                onLoad={this.handleLoad}/>
                            {loadingOverlay}
                        </div>
                        <div prefix="image-popup__footer">
                            <Menu
                                prefix="image-popup__menu"
                                orientation="horizontal"
                                items={menuItems}
                                disabled={menuDisabled}
                                onChange={this.handleMenuChange}/>
                        </div>
                    </div>
                )}
            </MediaQuery>
        );
    }

    @Core.bind()
    handleLoad() {
        let {naturalWidth: nw, naturalHeight: nh} = this.innerRefs.imageEl;

        this.setState({
            loading: false,
            nw,
            nh,
            rotate: 0,
            scale: 0.9,
            flipH: 1,
            flipV: 1
        });
    }

    @Core.bind()
    handleMenuChange(event) {
        this.setState(
            Object.assign({}, this.state, this[event.value](this.state))
        );
    }

    @Core.bind()
    handleResize() {
        Object.assign(this.innerRefs.imageEl.style, this.getStyle());
    }

    @Core.bind()
    handleWheel(event) {
        let {deltaY} = event,
            {state} = this;

        return this.setState(
            Object.assign(
                {},
                state,
                this['scale' + (deltaY > 0 ? 'Plus' : 'Minus')](state)
            )
        );
    }

    getStyle() {
        let {clientWidth: cw, clientHeight: ch} = this.innerRefs.contentEl,
            {nw, nh, rotate, scale, flipH, flipV} = this.state,
            dw, dh, width;

        if (rotate % 180) {
            dw = cw / nh;
            dh = ch / nw;
        } else {
            dw = cw / nw;
            dh = ch / nh;
        }

        if (dw > dh) {
            width = nw * dh * scale - 8;
        } else {
            width = nw * dw * scale - 8;
        }

        return {
            width: width + 'px',
            transform: [
                'scale(' + flipH + ',' + flipV + ')',
                'rotate(' + rotate + 'deg)'
            ].join(' ')
        };
    }

    scalePlus(state) {
        let scale = Math.round((state.scale + 0.1) * 10) / 10;

        if (scale > 5) {
            scale = 5;
        }

        return {scale};
    }

    scaleMinus(state) {
        let scale = Math.round((state.scale - 0.1) * 10) / 10;

        if (scale < 0.2) {
            scale = 0.2;
        }

        return {scale};
    }

    scaleFit() {
        return {scale: 1}
    }

    rotateLeft(state) {
        return {rotate: Math.round(state.rotate - 90 * state.flipH * state.flipV)};
    }
    
    rotateRight(state) {
        return {rotate: Math.round(state.rotate + 90 * state.flipH * state.flipV)};
    }

    flipHorizontal(state) {
        return {flipH: state.flipH * -1};
    }

    flipVertical(state) {
        return {flipV: state.flipV * -1};
    }
}