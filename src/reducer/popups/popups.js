import Core from 'core';

export default class Popups {

    static prefix() {
        return 'Popups';
    }

    static defaults() {
        return []
    }

    @Core.dispatch()
    static openPopup({state, popup}) {
        let {popups} = state,
            {key} = popup;

        if (!popups.find(i => i.key === key)) {
            state = state.set('popups', popups.concat(popup));
        }

        return state;
    }

    @Core.dispatch()
    static closePopup({state, popupKey}) {
        let {popups} = state,
            newPopups = popups.filter(i => i.key !== popupKey);

        if (popups.length !== newPopups.length) {
            state = state.set('popups', newPopups);
        }

        return state;
    }
}