import Core from 'core';
import ProfilePopup from 'component/profile-popup';

export default Core.connect(
    state => {
        return {
            profile: state.account
        };
    },
    ProfilePopup
);