import Core from 'core';
import Types from 'types';
import Popup from 'component/popup';
import Avatar from 'component/avatar';
import './profile-popup.scss';

let rows = [
    ['firstName', 'Имя'],
    ['lastName', 'Фамилия'],
    ['middleName', 'Отчество'],
    ['age', 'Возраст'],
    ['departmentName', 'Подразделение'],
    ['position', 'Должность']
];

export default class ProfilePopup extends Core.Component {

    @Core.props({
        group: 'own',
        include: 'profile'
    })
    @Core.types({
        profile: Types.contact
    })
    renderComponent() {
        let {profile} = this.own,
            {name, age, department, position, mask} = profile,
            rows = [
                ['Имя', name.first],
                ['Фамилия', name.last],
                ['Отчество', name.middle],
                ['Возраст', age],
                ['Маска', mask ? 'Есть' : 'Нет'],
                ['Подразделение', department.name + ' (' + department.key.toString().padStart(2, '0') + ')'],
                ['Должность', position]
            ].map(([name, value], k) => (
                <tr key={k}>
                    <td prefix="profile-popup__name">
                        {name + ':'}
                    </td>
                    <td prefix="profile-popup__value">
                        {value}
                    </td>
                </tr>
            )),
            title = name.last + ' ' + name.first + ' ' + name.middle;

        return (
            <Popup {...this.rest}
                prefix="profile-popup"
                title={title}>
                <Avatar
                    prefix="profile-popup__avatar"
                    size="large"
                    contact={profile}/>
                <table prefix="profile-popup__table">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </Popup>
        );
    }
}