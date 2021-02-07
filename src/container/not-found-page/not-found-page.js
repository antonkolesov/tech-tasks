import Core from 'core';
import Router from 'reducer/router';
import NotFoundPage from 'component/not-found-page';

export default Core.connect(
    () => {
        return {
            onPathChange: Router.setPath
        };
    },
    NotFoundPage
);