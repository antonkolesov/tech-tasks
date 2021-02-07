import Core from 'core';
import Types from 'types';
import Button from 'component/button';
import Checkbox from 'component/checkbox';
import CheckboxGroup from 'component/checkbox-group';
import DateField from 'component/date-field';
import Menu from 'component/menu';
import Radio from 'component/radio';
import RadioGroup from 'component/radio-group';
import TextField from 'component/text-field';
import './form.scss';

let {Provider, Consumer} = Core.createContext(),
    items = {
        Button: props => (
            <Button {...props}
                prefix="form__item"/>
        )
    };

Object.entries({
    Checkbox,
    CheckboxGroup,
    DateField,
    Menu,
    Radio,
    RadioGroup,
    TextField
}).forEach(([name, Item]) => {

    items[name] = class extends Core.Component {

        @Core.props({
            group: 'own',
            include: 'onChange'
        })
        @Core.types({
            onChange: Types.func
        })
        renderComponent() {
            return (
                <Consumer>
                    {this.renderChildren}
                </Consumer>
            );
        }

        @Core.bind()
        renderChildren(consumer) {
            let form = this.form = consumer.form,
                {values, errors} = form.own,
                {name} = this.rest,
                value = values[name],
                error = errors[name],
                props = {};

            if (value !== undefined && value !== null) {
                props.value = value;
            }

            if (error !== undefined && error !== null) {
                props.error = error;
            }

            return (
                <Item {...this.rest} {...props}
                    prefix="form__item"
                    onChange={this.handleChange}/>
            );
        }

        @Core.bind()
        handleChange(event) {
            let {name} = this.rest,
                {value} = event;

            this.fire('onChange', event);
            this.form.handleChange({event, name, value});
        }
    }
});

export default class Form extends Core.Component {

    @Core.props({
        group: 'own',
        include: [
            'disabled',
            'errors',
            'stateless',
            'values',
            'onChange',
            'onComplete',
            'onItemChange',
            'onReject',
            'onSubmit',
            'onValidate'
        ]
    })
    @Core.defaults({
        errors: {},
        values: {},
        disabled: false
    })
    @Core.statics(
        items
    )
    @Core.state(props => ({
        values: props.values,
        errors: props.errors
    }))
    @Core.types({
        disabled: Types.bool,
        errors: Types.object,
        stateless: Types.bool,
        values: Types.object,
        onChange: Types.func,
        onComplete: Types.func,
        onItemChange: Types.func,
        onReject: Types.func,
        onSubmit: Types.func,
        onValidate: Types.func
    })
    renderComponent() {
        let {stateless} = this.own;

        if (!stateless) {
            Object.assign(this.own, this.state);
        }
        
        let {children} = this.rest,
            {disabled} = this.own;

        return (
            <form {...this.rest}
                prefix="form"
                modifiers={{disabled}}
                onSubmit={this.handleSubmit}>
                <Provider value={{form: this}}>
                    {children}
                </Provider>
            </form>
        );
    }

    @Core.bind()
    handleSubmit(event) {
        event.preventDefault();

        let {values} = this.own,
            errors = {};

        errors = this.fire('onValidate', {errors, values}) || errors;

        if (Core.isEmpty(errors)) {
            let result = this.fire('onSubmit', {
                event,
                values,
                complete: this.handleComplete,
                reject: this.handleReject
            });
            
            if (result !== false) {
                this.setState({disabled: true});
            }
        } else {
            this.setState({errors});
        }
    }

    @Core.bind()
    handleChange(event) {
        let {name, value} = event,
            {values} = this.own;

        values = Object.assign({}, values, {
            [name]: value
        });

        this.setState({values});

        this.fire('onItemChange', event);
        this.fire('onChange', {event, values});
    }

    @Core.bind()
    handleComplete(event = {}) {
        let {values} = event,
            state = {
                disabled: false
            };
        
        if (values) {
            state.values = values;
        }

        this.setState(state);

        this.fire('onComplete', event);
    }

    @Core.bind()
    handleReject(event = {}) {
        let state = {
            disabled: false
        };

        let {values, errors} = event;

        if (values) {
            state.values = values;
        }

        if (errors && !Core.isEmpty(errors)) {
            state.errors = errors;
        }

        this.setState(state);

        this.fire('onReject', event);
    }
}