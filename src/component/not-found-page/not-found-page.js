import Core from 'core';
import Types from 'types';
import Button from 'component/button';
import './not-found-page.scss';

export default class NotFoundPage extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'onPathChange'
    })
    @Core.types({
        onPathChange: Types.func
    })
    renderComponent() {
        return (
            <div {...this.rest}
                prefix="not-found-page">
                <div prefix="not-found-page__code">
                    404
                </div>
                <div prefix="not-found-page__text">
                    Нет такой страницы!
                </div>
                <Button
                    prefix="not-found-page__button"
                    text="На главную"
                    onClick={this.handleClick}/>
            </div>
        );
    }

    @Core.bind()
    handleClick() {
        this.fire('onPathChange', {path: ''});
    }
}