import Core from 'core';
import Types from 'types';
import './scroller.scss';

export default class Scroller extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'as',
            'page',
            'hasMore',
            'getParent',
            'onPageChange'
        ]
    })
    @Core.innerRefs(
        'root'
    )
    @Core.defaults({
        as: 'div',
        getParent: node => node
    })
    @Core.types({
        as: Types.elementType,
        page: Types.number,
        hasMore: Types.bool,
        getParent: Types.func,
        onPageChange: Types.func
    })
    renderComponent() {
        let {innerRef} = this.rest;

        if (innerRef) {
            this.innerRefs.rootRef = innerRef;
        }

        let {as: As, page} = this.own,
            {rootRef, rootEl} = this.innerRefs;

        if (rootEl && !page && page !== 0) {
            this.getParent().scrollTop = 0;
        }

        return (
            <As {...this.rest}
                prefix="scroller"
                innerRef={rootRef}/>
        );
    }

    load() {
        let {page = 0} = this.own;
        this.fire('onPageChange', {page: page + 1});
    }

    getParent() {
        let {getParent} = this.own,
            {rootEl} = this.innerRefs;

        return getParent(rootEl);
    }

    @Core.bind()
    handleScroll(event) {
        if (!this.own.hasMore) return;

        let {scrollTop, clientHeight, scrollHeight} = event.target;

        if (scrollTop + clientHeight > scrollHeight - 20) {
            this.load();
        }
    }

    @Core.bind()
    handleAfterMount() {
        this.getParent().addEventListener('scroll', this.handleScroll);
    }

    @Core.bind()
    handleAfterRender() {
        if (!this.own.hasMore) return;

        let {clientHeight, scrollHeight} = this.getParent();

        if (clientHeight < scrollHeight) {

        } else {
            this.load();
        }
    }
}