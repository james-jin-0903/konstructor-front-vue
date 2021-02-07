import account from './account';
import user from './user';
import listing from './listing';
import communications from './communications';
import address from './address';
import social from './social';
import payment from './payment';
import emails from './emails';
import skills from './skills';
import interests from './interests';
import projects from './projects';
import global from '@/store/modules/auth/global';
import recover from '@/store/modules/auth/recover';
import signIn from '@/store/modules/auth/signIn';
import signUp from '@/store/modules/auth/signUp';
import socialAuth from '@/store/modules/auth/socialAuth';

export default {
  account,
  address,
  user,
  listing,
  communications,
  social,
  payment,
  emails,
  skills,
  interests,
  projects,

  // auth modules
  global,
  recover,
  signIn,
  signUp,
  socialAuth
};
