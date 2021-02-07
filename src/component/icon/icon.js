import Core from 'core';
import Types from 'types';
import './icon.scss';

export default class Icon extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'name',
            'size'
        ]
    })
    @Core.types({
        name: Types.string,
        size: Types.oneOf(['small', 'medium', 'large', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x'])
    })
    renderComponent() {
        let {name, size} = this.own;

        return (
            <div {...this.rest}
                prefix="icon"
                modifiers={{name, size}}/>
        );
    }
}