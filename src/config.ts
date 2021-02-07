const config = window['config'] || {}; // TODO: update all values from the kubernetes (through configMap)
const HOST = '//' + location.hostname + (location.port ? (':' + location.port): '');


// export const API_URL = config.APP_API_URL || process.env.VUE_APP_API_URL || (location.protocol + HOST);
// export const AUTH_API_URL = config.APP_AUTH_API_URL || process.env.VUE_APP_AUTH_API_URL || (location.protocol + HOST + '/auth');
// export const CHAT_URL = config.APP_CHAT_URL || process.env.VUE_APP_CHAT_URL || ('ws:' + HOST + '/chat');
// export const DOMAIN_TITLE = config.APP_DOMAIN_TITLE || process.env.VUE_APP_DOMAIN_TITLE || 'Konstruktor';

export const API_URL = 'https://web.konstruktor.com';
export const AUTH_API_URL = 'https://web.konstruktor.com/auth';
export const CHAT_URL = 'https://web.konstruktor.com/chat';
export const DOMAIN_TITLE = 'Konstruktor';

export const CLIENT_UUID = 'c86346bb-48fa-4216-8988-3ececae55907';


export const social = {
  pinterest: {
    client_id: '5065879362581085286',
    redirect: 'pinterest'
  },
  facebook: {
    client_id: '561838614384357',
    redirect: 'facebook',
    secret: '8a777c1ac0b364b1d86b866971e78ce5'
  }
};

export const authRoutesMap = {
  root: '/',
  home: '/home',
  signIn: '/signIn',
  signUp: '/signUp',
  signUpPath: '/signUp/path',
  interest: '/signUp/interest',
  skills: '/signUp/skills',
  signSocial: '/sign/:type/:social',
  recover: '/recover',
  recover_pass: '/recover/:token',
  auth: '/authed'
};


export const levelRoutes = [
  {
    level: 0,
    name: 'signUp',
    route: authRoutesMap.signUp
  },
  {
    level: 1,
    name: 'signUpPath',
    route: authRoutesMap.signUpPath
  },
  {
    level: 2,
    name: 'skills',
    route: authRoutesMap.skills
  },
  {
    level: 3,
    name: 'interest',
    route: authRoutesMap.interest
  }
];
