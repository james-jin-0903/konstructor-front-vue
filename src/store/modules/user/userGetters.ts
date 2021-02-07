import { UserState } from '@/store/modules/user/userState';

export default {
  getUser: (state: UserState) => state.currentUser,
  getUserLoaded: (state: UserState) => state.loaded
};