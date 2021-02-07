import { UserState, User } from '@/store/modules/user/userState';

export default {
  SET_USER(state: UserState, currentUserData: User) {
    state.currentUser = currentUserData;
  },
  SET_USER_LOADED(state: UserState, loadedState: boolean) {
    state.loaded = loadedState;
  }
};
