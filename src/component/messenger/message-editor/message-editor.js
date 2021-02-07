import Core from 'core';
import Types from 'types';
import Button from 'component/button';
import TextField from 'component/text-field';
import './message-editor.scss';

export default class MessageEditor extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'draft',
            'onMessageChange',
            'onMessageSend'
        ]
    })
    @Core.innerRefs(
        'input'
    )
    @Core.types({
        draft: Types.string,
        onMessageChange: Types.func,
        onMessageSend: Types.func
    })
    renderComponent() {
        let {draft} = this.own,
            {inputRef} = this.innerRefs;

        return (
            <div {...this.rest}
                prefix="messenger-message-editor">
                <TextField
                    prefix="messenger-message-editor__field"
                    placeholder="Введите сообщение..."
                    multiline={true}
                    value={draft}
                    inputRef={inputRef}
                    onChange={this.handleChange}/>
                <div prefix="messenger-message-editor__footer">
                    <Button
                        prefix="messenger-message-editor__submit"
                        disabled={!draft}
                        text="Отправить"
                        onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }

    @Core.bind()
    handleAfterRender() {
        let {inputEl} = this.innerRefs;

        Object.assign(inputEl.style, {
            overflowY: 'hidden',
            height: '1px'
        });

        Object.assign(inputEl.style, {
            overflowY: 'auto',
            height: (inputEl.scrollHeight + 2) + 'px'
        });
    }

    @Core.bind()
    handleChange(event) {
        this.fire('onMessageChange', event);
    }

    @Core.bind()
    handleSubmit() {
        let {draft: value} = this.own;
        this.fire('onMessageSend', {value});
    }
}