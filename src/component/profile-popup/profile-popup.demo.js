import Core from 'core';
import Demo from 'demo';
import Popup from 'component/popup';
import ProfilePopup from './profile-popup';
import 'index.scss';

Core.render(
    <Demo title="ProfilePopup">
        <Popup.Manager/>
        <Demo.Item title="Default">
            <button
                onClick={() => {
                    Popup.open({
                        key: 'profile',
                        component: ProfilePopup,
                        contact: {
                            id: 0,
                            avatar: '/static/avatar/0.svg',
                            firstName: 'Иван',
                            middleName: 'Иванович',
                            lastName: 'Иванов',
                            department: 1,
                            departmentName: 'Технический отдел',
                            position: 'Пасечник',
                            age: 30
                        }
                    })
                }}>
                OpenPopup
            </button>
        </Demo.Item>
    </Demo>
);