import Core from 'core';
import Data from 'data';

export default class Help {

    static prefix() {
        return 'Help';
    }

    static defaults() {
        return {
            activeItem: 'item-0',
            content: {},
            tableOfContent: null,
            expandedItems: ['group-0']
        };
    }

    @Core.async()
    static readTableOfContent() {
        Help.setTableOfContent({
            tableOfContent: Core.loading
        });
        
        Data.fetch('Help:read').then(
            tableOfContent => Help.setTableOfContent({tableOfContent})
        );
    }

    @Core.async()
    static readContent({activeItem}) {
        Help.setContent({
            activeItem,
            content: Core.loading
        });

        Data.fetch('Help:read', activeItem).then(
            content => Help.setContent({
                activeItem,
                content
            })
        );
    }

    @Core.dispatch()
    static setContent({state, activeItem, content}) {
        return state.setIn(['help', 'content', activeItem], content);
    }

    @Core.dispatch()
    static setTableOfContent({state, tableOfContent}) {
        return state.setIn(['help', 'tableOfContent'], tableOfContent);
    }

    @Core.dispatch()
    static setExpandedItems({state, expandedItems}) {
        return state.setIn(['help', 'expandedItems'], expandedItems);
    }

    @Core.dispatch()
    static setActiveItem({state, activeItem}) {
        return state.setIn(['help', 'activeItem'], activeItem);
    }
}