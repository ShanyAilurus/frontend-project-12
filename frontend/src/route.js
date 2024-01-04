export default {
  loginPath: () => ['api', 'v1', 'login'].join('/'),
  dataPath: () => ['api', 'v1', 'data'].join('/'),
  creatNewUser: () => ['api', 'v1', 'signup'].join('/'),
  login: () => '/login',
  signUp: () => '/signup',
  err: () => '*',
  chat: () => '/',
};
