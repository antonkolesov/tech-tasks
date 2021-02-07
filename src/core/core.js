import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'seamless-immutable';
import {Provider, connect as reduxConnect} from 'react-redux';
import {Transition} from 'react-transition-group';
import {createStore as reduxCreateStore} from 'redux';
import {createSelector as reselectCreateSelector} from 'reselect';

let locale = {
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonthNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    },
    loading = Symbol('loading'),
    cachedReducers,
    cachedStore;

function async() {
    return (target, name, descriptor) => {
        let fn = descriptor.value;
        descriptor.value = function(args = {}) {
            args.state = cachedStore.getState();
            return fn(args);
        };
    };
}

function bind() {
    return (target, name) => {
        let {constructor} = target;

        if (!constructor.hasOwnProperty('_bind')) {
            constructor._bind = constructor._bind.concat([]);
        }

        let {_bind} = constructor;

        if (!_bind.includes(name)) {
            _bind.push(name);
        }
    };
}

function connect(stateToProps, component) {
    return reduxConnect(stateToProps, () => ({}))(component);
}

function createElement(type, props, ...children) {
    if (props) {
        if (props.prefix) {
            let {prefix, modifiers, className} = props;

            if (modifiers) {
                modifiers = Object.entries(modifiers)
                    .map(([name, value]) => (value || value === 0) && prefix + '--' + name + (value === true ? '' : '-' + value))
                    .filter(className => !!className)
                    .join(' ');

                delete props.modifiers;
            }

            className = [prefix, modifiers, className]
                .filter(className => !!className)
                .join(' ');

            if (className) {
                props.className = className;
            }

            delete props.prefix;
        }

        if (props.innerRef && typeof type === 'string') {
            props.ref = props.innerRef;
            delete props.innerRef;
        }
    }

    return React.createElement(type, props, ...children);
}

function createStore(config) {
    let defaults = {},
        reducers = [];

    cachedReducers = config;

    Object.entries(config).forEach(([name, reducer]) => {
        defaults[name[0].toLowerCase() + name.slice(1)] = reducer.defaults();

        if (reducer._reducer) {
            reducers.push(reducer._reducer);
        }
    });

    defaults = Immutable(defaults);

    let reducer = (state, action) => {
        if (!state) {
            state = defaults;
        }

        reducers.forEach(reducer => {
            state = reducer(state, action) || state;
        });

        return state;
    };

    return cachedStore = reduxCreateStore(reducer);
}

function defaults(props) {
    return target => {
        let {constructor} = target;
        constructor.defaultProps = Object.assign({}, constructor.defaultProps, props);
    };
}

function dispatch() {
    return (target, name, descriptor) => {
        let dispatchers = target._dispatchers,
            type = target.prefix() + ':' + name;

        if (!dispatchers) {
            dispatchers = target._dispatchers = {};

            target._reducer = (state, action) => {
                let {type, args} = action;

                if (dispatchers[type]) {
                    return dispatchers[type](Object.assign({state}, args));
                } else {
                    return state;
                }
            };
        }

        target['pure' + name.charAt(0).toUpperCase() + name.slice(1)] = dispatchers[type] = descriptor.value;
        descriptor.value = function(args) {
            cachedStore.dispatch({type, args});
        };
    };
}

function emptyFn() {}

function formatDate(date, format) {
    let formats = this.formatDate._formats || (this.formatDate._formats = {}),
        fn = formats[format];

    if (!fn) {
        let fnStr = format.replace(/(Y|y|F|M|m|d|H|i)/g, match => {
            let matchStr;

            switch (match) {
                case 'Y':
                    matchStr = '(date.getFullYear()+"").padStart(4,"0")';
                    break;
                case 'y':
                    matchStr = '(date.getFullYear()+"").padStart(4,"0").slice(2)';
                    break;
                case 'F':
                    matchStr = 'this.monthNames[date.getMonth()]';
                    break;
                case 'M':
                    matchStr = 'this.shortMonthNames[date.getMonth()]';
                    break;
                case 'm':
                    matchStr = '(date.getMonth()+1+"").padStart(2,"0")';
                    break;
                case 'd':
                    matchStr = '(date.getDate()+"").padStart(2,"0")';
                    break;
                case 'H':
                    matchStr = '(date.getHours()+"").padStart(2,"0")';
                    break;
                case 'i':
                    matchStr = '(date.getMinutes()+"").padStart(2,"0")';
                    break;
            }

            return '"+(' + matchStr + ')+"';
        });

        fn = formats[format] = new Function('date', 'return"' + fnStr + '";').bind(locale);
    }

    return fn(date);
}

function getReducer(...names) {
    let reducer = cachedReducers;

    names.forEach(i => {
        reducer = reducer[i]
    });

    return reducer;
}

function isEmpty(value) {
    if (typeof value === 'object' && value !== null) {
        return !Object.keys(value).length;
    }
}

function memo(args) {
    return (Target, name, descriptor) => {
        let {value} = descriptor;
        descriptor.value = state => {
            return (Target[name] = reselectCreateSelector(...(args()), value))(state);
        }
    }
}

function innerRefs(...innerRefs) {
    return target => {
        let {constructor} = target,
            newInnerRefs = constructor._innerRefs = constructor._innerRefs.concat([]),
            newProps = constructor._props = Object.assign({}, constructor._props);

        innerRefs.forEach(innerRef => {
            if (!newInnerRefs.includes(innerRef)) {
                let refName = innerRef + 'Ref';

                newInnerRefs.push(innerRef);

                (newProps[refName] || (newProps[refName] = [])).push({
                    prop: refName,
                    group: 'innerRefs'
                });
            }
        });
    };
}

function print(...args) {
    console.log(...args);
}

function props(...props) {
    return target => {
        let {constructor} = target,
            newGroups = constructor._groups = constructor._groups.concat([]),
            newProps = constructor._props = Object.assign({}, constructor._props);

        props.forEach(item => {
            let {group, include, component, prefix} = item;

            if (!newGroups.includes(group)) {
                newGroups.push(group);
            }

            include = include ? toArray(include) : [];

            if (component) {
                include = include.concat(
                    Object.keys(component._props).filter(prop => !include.includes(prop))
                );
            }

            include.forEach(prop => {
                let [firstName, secondName] = prop.split(':');

                if (!secondName) {
                    secondName = firstName;
                } 

                if (prefix) {
                    let match = firstName.match(/^(on(?:Before|After)?)([A-Z].*)$/);
                    
                    if (match) {
                        firstName = match[1] + prefix.charAt(0).toUpperCase() + prefix.slice(1) + match[2];
                    } else {
                        firstName = prefix + firstName.charAt(0).toUpperCase() + firstName.slice(1);
                    }
                }

                (newProps[firstName] || (newProps[firstName] = [])).push({
                    prop: secondName,
                    group
                });
            });
        });
    };
}

function pure(value) {
    return ({constructor}) => {
        constructor._pure = value;
    };
}

function render(element, container = '.root', callback) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }

    return ReactDOM.render(element, container, callback);
}

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    let keysA = Object.keys(objA),
        keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

function state(state) {
    return target => {
        target.constructor._state = state;
    }
}

function statics(props) {
    return target => {
        Object.assign(target.constructor, props);
    };
}

function toArray(value) {
    return Array.isArray(value) ? value : [value];
}

function types(value) {
    return target => {
        let {constructor} = target;
        constructor.propTypes = Object.assign({}, constructor.propTypes, value);
    };
}

class Component extends React.Component {

    constructor(props) {
        super(props);

        let {_innerRefs, _bind, _state} = this.constructor;

        if (_innerRefs.length) {
            let innerRefs = this._innerRefs = {};

            _innerRefs.forEach(innerRef => {
                Object.defineProperties(innerRefs, {
                    [innerRef + 'Ref']: {
                        value: React.createRef(),
                        writable: true
                    },
                    [innerRef + 'El']: {
                        get: () => this.innerRefs[innerRef + 'Ref'].current
                    }
                });
            });
        }

        if (_bind.length) {
            _bind.forEach(methodName => {
                this[methodName] = this[methodName].bind(this);
            });
        }

        if (_state) {
            this.state = _state(props);
        }
    }

    render() {
        let {_groups, _props} = this.constructor;
        
        if (_groups.length) {
            _groups.forEach(groupName => {
                this[groupName] = {};
            });
        }

        if (this._innerRefs) {
            this.innerRefs = Object.create(this._innerRefs);
        }

        if (_props) {
            Object.entries(this.props).forEach(([propName, propValue]) => {
                let propDesc = _props[propName];
                
                if (propDesc) {
                    propDesc.forEach(prop => {
                        this[prop.group][prop.prop] = propValue;
                    });
                } else {
                    this.rest[propName] = propValue;
                }
            });
        }

        if (this.isMounted()) {
            (this.handleBeforeUpdate || emptyFn)();
        } else {
            (this.handleBeforeMount || emptyFn)();
        }

        (this.handleBeforeRender || emptyFn)();

        return this.renderComponent();
    }

    isMounted() {
        return !!this._isMounted;
    }

    setState(...args) {
        if (this.isMounted()) {
            super.setState(...args);
        }
    }

    fire(handler, ...args) {
        if (typeof handler === 'string') {
            handler = this.props[handler];
        }

        if (handler) {
            return handler(...args);
        }
    }

    shouldComponentUpdate(props, state) {
        if (this.constructor._pure) {
            return !(shallowEqual(props, this.props) && shallowEqual(state, this.state));
        }
        return true;
    }

    componentDidMount() {
        this._isMounted = true;
        (this.handleAfterMount || emptyFn)();
        (this.handleAfterRender || emptyFn)();
    }

    componentDidUpdate() {
        (this.handleAfterUpdate || emptyFn)();
        (this.handleAfterRender || emptyFn)();
    }

    componentWillUnmount() {
        this._isMounted = false;
        (this.handleBeforeUnmount || emptyFn)();
    }
}

Object.assign(Component, {
    _pure: true,
    _groups: ['rest'],
    _props: {},
    _innerRefs: [],
    _bind: []
});

let {Fragment, createContext, createRef} = React,
    {createPortal} = ReactDOM;

export default {
    Component,
    Fragment,
    Provider,
    Transition,
    async,
    bind,
    connect,
    createContext,
    createElement,
    createPortal,
    createRef,
    createStore,
    defaults,
    dispatch,
    formatDate,
    getReducer,
    innerRefs,
    isEmpty,
    loading,
    locale,
    memo,
    print,
    props,
    pure,
    render,
    shallowEqual,
    state,
    statics,
    toArray,
    types
}