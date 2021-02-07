import Core from 'core';
import TaskPage from 'component/task-page';

export default Core.connect(
    state => {
        let {collapsed} = state.app;

        return {
            collapsed
        };
    },
    TaskPage
);