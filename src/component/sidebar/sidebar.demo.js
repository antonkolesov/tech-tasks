import Component from 'component';
import Sidebar from './sidebar';
import 'index.scss';

class SidebarDemo extends Component {

    renderComponent() {
        return <>
            <Sidebar/>
        </>
    }
}

Component.render(
    <SidebarDemo/>
);