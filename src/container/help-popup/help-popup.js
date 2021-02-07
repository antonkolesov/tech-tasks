import Core from 'core';
import Help from 'reducer/help';
import HelpPopup from 'component/help-popup';

export default Core.connect(
    state => {
        return Object.assign({
            onContentRead: Help.readContent,
            onTableOfContentRead: Help.readTableOfContent,
            onExpand: Help.setExpandedItems,
            onChange: Help.setActiveItem
        }, state.help);
    },
    HelpPopup
);