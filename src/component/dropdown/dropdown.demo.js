import Core from 'core';
import Demo from 'demo';
import Dropdown from './dropdown';
import 'index.scss';

Core.render(
    <Demo title="Dropdown">
        <Demo.Item title="Default">
            <Dropdown
                icon="demo"
                text="Dropdown">
                DropdownMenu
            </Dropdown>
        </Demo.Item>
        <Demo.Item title="Arrow">
            {['left', 'right', 'top', 'bottom', null].map(i => (
                <Dropdown
                    key={i + ''}
                    arrow={i}
                    icon="demo"
                    text="Dropdown">
                    DropdownMenu
                </Dropdown>
            ))}
        </Demo.Item>
    </Demo>
);