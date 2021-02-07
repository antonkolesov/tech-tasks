import Core from 'core';
import Demo from 'demo';
import Form from './form';
import 'index.scss';

Core.render(
    <Demo title="Form">
        <Demo.Item title="Default">
            <Form
                values={{
                    textField: 'TextFieldValue',
                    checkbox: false,
                    radio: false
                }}
                errors={{
                    textField: 'TextFieldError'
                }}
                onItemChange={e => {
                    console.log('onItemChange: ', e);
                }}
                onChange={e => {
                    console.log('onChange: ', e);
                }}
                onValidate={e => {
                    if (e.values.textField === 'error') {
                        e.errors.textField = 'SumitError!';
                    }
                }}
                onSubmit={e => {
                    setTimeout(() => e.complete(), 500);
                }}>
                <Form.TextField
                    name="textField"/>
                <Form.Checkbox
                    name="checkbox"
                    label="Checkbox"/>
                <Form.Radio
                    name="radio"
                    label="Radio"/>
                <Form.Button
                    type="submit"
                    text="Submit"/>
            </Form>
        </Demo.Item>
    </Demo>
);