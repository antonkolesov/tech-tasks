import Core from 'core';
import Types from 'types';
import DataPopup from 'component/data-popup';
import Tree from 'component/tree';
import LoadingOverlay from 'component/loading-overlay';
import NotFoundOverlay from 'component/not-found-overlay';
import './help-popup.scss';

export default class HelpPopup extends Core.Component {

    @Core.props({
        group: 'rest',
        include: 'onTableOfContentRead:onLoad'
    }, {
        group: 'own',
        include: [
            'activeItem',
            'content',
            'tableOfContent',
            'onContentRead'
        ]
    }, {
        group: 'tree',
        component: Tree
    })
    @Core.types({
        activeItem: Types.string,
        content: Types.object,
        tableOfContent: Types.oneOfType([
            Types.array,
            Types.loading
        ]),
        onContentRead: Types.func
    })
    renderComponent() {
        let {tableOfContent} = this.own;

        return (
            <DataPopup {...this.rest}
                prefix="help-popup"
                title="Справка"
                resize="all"
                data={tableOfContent}>
                {() => <>
                    {this.renderSidebar()}
                    {this.renderBody()}
                </>}
            </DataPopup>
        );
    }

    renderSidebar() {
        let {tableOfContent} = this.own;

        return (
            <div prefix="help-popup__sidebar">
                <div prefix="help-popup__header">
                    Содержание
                </div>
                <Tree {...this.tree}
                    prefix="help-popup__tree"
                    items={tableOfContent}/>
            </div>
        );
    }

    renderBody() {
        let {activeItem, content} = this.own,
            children;

        content = content[activeItem];

        if (!content) {
            children = null;
        } else if (content === Core.loading) {
            children = <>
                <div prefix="help-popup__header">
                    Загрузка...
                </div>
                <LoadingOverlay prefix="help-popup__loading-overlay"/>
            </>;
        } else {
            children = <>
                <div prefix="help-popup__header">
                    {content.title || 'Без названия'}
                </div>
                {content.text ? (
                    <div prefix="help-popup__text">
                        {content.text.map((i, k) => (
                            <div prefix="help-popup__paragraph" key={k}>{i}</div>
                        ))}
                    </div>
                ) : (
                    <NotFoundOverlay prefix="help-popup__not-found-overlay"/>
                )}
            </>
        }

        return (
            <div prefix="help-popup__body">
                {children}
            </div>
        );
    }

    @Core.bind()
    handleAfterRender() {
        let {activeItem, content} = this.own;

        if (!content[activeItem]) {
            this.fire('onContentRead', {activeItem});
        }
    }
}