import Core from 'core';
import Types from 'types';
import TextField from 'component/text-field';
import './contact-filter.scss';

export default class ContactFilter extends Core.Component {

    @Core.props({
        group: 'filter',
        include: [
            'filter:value',
            'onFilterChange:onChange'
        ]
    })
    @Core.types({
        filter: Types.string,
        onFilterChange: Types.func
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="messenger-contact-filter">
                <TextField {...this.filter}
                    prefix="messenger-contact-filter__field"
                    placeholder="Поиск контактов..."
                    spellCheck={false}/>
            </div>
        );
    }
}