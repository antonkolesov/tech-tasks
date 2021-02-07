import Core from 'core';
import './demo.scss';

class Item extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'title'
    })
    renderComponent() {
        let {title} = this.own,
            {children} = this.rest;

        if (!Array.isArray(children)) {
            children = [children];
        }

        return (
            <div prefix="demo-item">
                {title && (
                    <div prefix="demo-item__header">
                        {title}
                    </div>
                )}
                <div prefix="demo-item__body">
                    {children.map((i, k) => (
                        <div
                            key={k + ''}
                            prefix="demo-item__container">
                            {i}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default class Demo extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'title',
            'style'
        ]
    })
    @Core.statics({
        Item
    })
    renderComponent() {
        let {title, style} = this.own,
            {children} = this.rest,
            modifier = {};

        if (title) {
            modifier = title.replace(/([A-Z])/g, (match) => (
                '-' + match.toLowerCase()
            ));
            if (modifier[0] === '-') {
                modifier = modifier.slice(1);
            }
        }

        return (
            <div {...this.rest}
                prefix="demo"
                modifiers={modifier && {[modifier]: true}}>
                {title && (
                    <div prefix="demo__header">
                        {title}
                    </div>
                )}
                <div prefix="demo__body">
                    {children}
                </div>
                {style && Core.createPortal(
                    <style>{style}</style>,
                    document.head
                )}
            </div>
        );
    }
}