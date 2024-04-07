const apiPath = '/api/v1';

// eslint-disable-next-line import/no-anonymous-default-export
const routes = {
    loginPath: () => [apiPath, 'login'].join('/'),
    dataPath: () => [apiPath, 'data'].join('/'),
};

export default routes;
