export interface User {
  first_name: string,
  last_name: string,
  patronymic: string,
  gender: string,
  date_of_birth: string,
}

export interface UserState {
  currentUser: User,
  loaded: boolean
}

export default {
  currentUser: null,
  loaded: false
};
