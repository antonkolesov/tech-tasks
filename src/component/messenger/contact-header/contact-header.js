import Core from 'core';
import Types from 'types';
import Menu from 'component/menu'
import './contact-header.scss';

export default class ContactHeader extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'group',
            'sort',
            'onActiveTabChange',
            'onSortChange',
            'onGroupChange'
        ]
    })
    @Core.types({
        group: Types.contactGroup,
        sort: Types.contactSort,
        onActiveTabChange: Types.func,
        onSortChange: Types.func,
        onGroupChange: Types.func
    })
    renderComponent() {
        let {group, sort: {sort, order}} = this.own,
            value = 'group:' + (group === null ? 'none' : group),
            sortItems = [{
                key: 'sended',
                text: 'Дате'
            }, {
                key: 'firstName',
                text: 'Имени'
            }, {
                key: 'lastName',
                text: 'Фамилии'
            }, {
                key: 'middleName',
                text: 'Отчеству'
            }, {
                key: 'department',
                text: 'Отделу'
            }].map(i => (
                Object.assign(i, {
                    key: 'sort:' + i.key,
                    modifiers: {[i.key === sort && order === 'asc' ? 'desc' : 'asc']: true}
                })
            )),
            items = [{
                key: 'options',
                icon: 'sort',
                arrow: true,
                items: [{
                    as: 'div',
                    children: 'Сортировать по:',
                    prefix: 'messenger-contact-header__menu-group'
                }, ...sortItems, {
                    as: 'div',
                    children: 'Группировать по:',
                    prefix: 'messenger-contact-header__menu-group'
                }, {
                    key: 'group:alphabet',
                    text: 'Алфавиту'
                }, {
                    key: 'group:department',
                    text: 'Отделу'
                }, {
                    key: 'group:status',
                    text: 'Статусу'
                }, {
                    key: 'group:none',
                    text: 'Нет'
                }]
            }, {
                key: 'dialogue',
                icon: 'arrow-right'
            }];

        return (
            <div {...this.rest}
                prefix="messenger-contact-header">
                <div prefix="messenger-contact-header__title">
                    Контакты
                </div>
                <Menu
                    prefix="messenger-contact-header__menu"
                    orientation="horizontal"
                    submenuPrefix="messenger-contact-header__submenu"
                    items={items}
                    value={value}
                    onChange={this.handleChange}/>
            </div>
        );
    }

    @Core.bind()
    handleChange(event) {
        let [namespace, action] = event.value.split(':'),
            {sort} = this.own;

        switch (namespace) {
            case 'dialogue':
                this.fire('onActiveTabChange', {
                    activeTab: 'dialogue'
                });
                break;
            case 'sort':
                let order;

                if (sort.sort === action) {
                    order = sort.order === 'desc' ? 'asc' : 'desc';
                } else {
                    order = 'asc';
                }

                this.fire('onSortChange', {
                    sort: {sort: action, order}
                });
                break;
            case 'group':
                if (action === 'none') {
                    action = null;
                }
                this.fire('onGroupChange', {
                    group: action
                });
                break;
        }
    }
}