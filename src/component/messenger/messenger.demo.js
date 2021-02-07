import Core from 'core';
import Demo from 'demo';
import Messenger from './messenger';
import 'index.scss';

let contacts = [{"key":1,"active":false,"firstName":"Роман","middleName":"Григорьевич","lastName":"Макаров","department":6,"lastMessage":{"key":1000,"sender":1,"sended":1578677293902,"text":"И эти терзают глаз."}},{"key":2,"active":true,"firstName":"Евгений","middleName":"Иваныч","lastName":"Смирнов","department":8,"lastMessage":{"key":1000,"sender":0,"sended":1580016560279,"text":"Тогда я заговорю."}},{"key":3,"active":true,"firstName":"Игорь","middleName":"Артемович","lastName":"Козлов","department":4,"lastMessage":{"key":1000,"sender":0,"sended":1577937855871,"text":"И эти терзают глаз."}},{"key":4,"active":false,"firstName":"Арсений","middleName":"Семенович","lastName":"Семенов","department":10,"lastMessage":{"key":1000,"sender":4,"sended":1579832367029,"text":"Зачем тебе Солнце, если ты куришь Шипку?"}},{"key":5,"active":true,"firstName":"Михаил","middleName":"Кириллович","lastName":"Григорьев","department":6,"lastMessage":{"key":1000,"sender":5,"sended":1578829602690,"text":"Ты написал много букв; еще одна будет лишней."}},{"key":6,"active":false,"firstName":"Андрей","middleName":"Павлович","lastName":"Яковлев","department":8,"lastMessage":{"key":1000,"sender":0,"sended":1580148735605,"text":"Вещи и люди нас."}},{"key":7,"active":false,"firstName":"Тимур","middleName":"Исаакович","lastName":"Волков","department":4,"lastMessage":{"key":1000,"sender":0,"sended":1580059927680,"text":"Не выходи из комнаты; считай, что тебя продуло."}},{"key":8,"active":false,"firstName":"Роман","middleName":"Романович","lastName":"Иванов","department":6,"lastMessage":{"key":1000,"sender":8,"sended":1578054675836,"text":"В прихожей пахнет капустой и мазью лыжной."}},{"key":9,"active":false,"firstName":"Никита","middleName":"Робертович","lastName":"Орлов","department":5,"lastMessage":{"key":1000,"sender":0,"sended":1578941141642,"text":"Лучше жить в темноте."}},{"key":10,"active":false,"firstName":"Руслан","middleName":"Григорьевич","lastName":"Григорьев","department":2,"lastMessage":{"key":1000,"sender":0,"sended":1579580936938,"text":"Зачем тебе Солнце, если ты куришь Шипку?"}},{"key":11,"active":true,"firstName":"Матвей","middleName":"Ефимович","lastName":"Смирнов","department":3,"lastMessage":{"key":1000,"sender":0,"sended":1579936217122,"text":"Я сижу на скамье."}},{"key":12,"active":false,"firstName":"Алексей","middleName":"Семенович","lastName":"Смирнов","department":3,"lastMessage":{"key":1000,"sender":12,"sended":1579416074584,"text":"Пора. Я готов начать."}},{"key":13,"active":true,"firstName":"Тимур","middleName":"Филиппович","lastName":"Соловьев","department":7,"lastMessage":{"key":1000,"sender":13,"sended":1580223159471,"text":"В парке, глядя вослед."}},{"key":14,"active":true,"firstName":"Алексей","middleName":"Исаакович","lastName":"Зайцев","department":2,"lastMessage":{"key":1000,"sender":0,"sended":1577845686963,"text":"Шкафом от хроноса, космоса, эроса, расы, вируса."}},{"key":15,"active":false,"firstName":"Егор","middleName":"Юрьевич","lastName":"Андреев","department":7,"lastMessage":{"key":1000,"sender":0,"sended":1579348463864,"text":"Не выходи из комнаты, не совершай ошибку."}},{"key":16,"active":false,"firstName":"Артем","middleName":"Артемович","lastName":"Федоров","department":9,"lastMessage":{"key":1000,"sender":0,"sended":1579461748010,"text":"Это январь. Зима."}},{"key":17,"active":true,"firstName":"Артем","middleName":"Яковлевич","lastName":"Павлов","department":2,"lastMessage":{"key":1000,"sender":17,"sended":1578876123430,"text":"За дверью бессмысленно все, особенно — возглас счастья."}},{"key":18,"active":true,"firstName":"Артем","middleName":"Эдуардович","lastName":"Федоров","department":7,"lastMessage":{"key":1000,"sender":18,"sended":1578951294631,"text":"В парке, глядя вослед."}},{"key":19,"active":true,"firstName":"Денис","middleName":"Александрович","lastName":"Николаев","department":7,"lastMessage":{"key":1000,"sender":19,"sended":1578874134060,"text":"В прихожей пахнет капустой и мазью лыжной."}},{"key":20,"active":true,"firstName":"Кирилл","middleName":"Артемович","lastName":"Михайлов","department":2,"lastMessage":{"key":1000,"sender":20,"sended":1578766710353,"text":"Вещи и люди нас."}}];

class MessengerDemo extends Core.Component {

    @Core.state(() => {
        return {
            activeTab: 'contacts',
            contacts: null
        }
    })
    renderComponent() {
        return <>
            <Messenger {...this.state}
                onContactListLoad={this.handleContactListLoad}/>
        </>
    }

    @Core.bind()
    handleContactListLoad() {
        this.setState({
            contacts: Core.loading
        });
        this.setState({
            contacts
        });
    }
}

let style = `
    .demo--messenger .messenger {
        width: 320px;
        height: 500px;
        border: 1px solid black;
    }
`;

Core.render(
    <Demo
        title="Messenger"
        style={style}>
        <Demo.Item title="Default">
            <MessengerDemo/>
        </Demo.Item>
    </Demo>
);