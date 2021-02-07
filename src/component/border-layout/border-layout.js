import Core from 'core';
import Types from 'types';
import MediaQuery from 'component/media-query';
import './border-layout.scss';

export default class BorderLayout extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'center',
            'collapsed',
            'left',
            'right'
        ]
    })
    @Core.defaults({
        collapsed: {}
    })
    @Core.types({
        collapsed: Types.exact({
            left: Types.bool,
            right: Types.bool
        }),
        center: Types.oneOfType([
            Types.element,
            Types.func
        ]),
        left: Types.oneOfType([
            Types.element,
            Types.func
        ]),
        right: Types.oneOfType([
            Types.element,
            Types.func
        ])
    })
    renderComponent() {
        return (
            <MediaQuery>
                {this.renderChildren}
            </MediaQuery>
        );
    }

    @Core.bind()
    renderChildren(media) {
        let {collapsed} = this.own,
            {notify} = media,
            transition = {
                timeout: 120,
                mountOnEnter: true,
                unmountOnExit: true,
                onEntering: notify,
                onExiting: notify
            }

        return (
            <div {...this.rest} {...media}
                prefix="border-layout">
                <Core.Transition {...transition}
                    in={!collapsed.left}>
                    {this.renderLeft}
                </Core.Transition>
                {this.renderCenter()}
                <Core.Transition {...transition}
                    in={!collapsed.right}>
                    {this.renderRight}
                </Core.Transition>
            </div>
        );
    }

    renderItem(name, transition) {
        let item = this.own[name];

        return (
            <div
                prefix={'border-layout__' + name}
                modifiers={transition ? {transition} : null}>
                {typeof item === 'function' ? item() : item}
            </div>
        );
    }

    renderCenter() {
        return this.renderItem('center');
    }

    @Core.bind()
    renderLeft(transition) {
        return this.renderItem('left', transition);
    }

    @Core.bind()
    renderRight(transition) {
        return this.renderItem('right', transition);
    }
}