import {ActionType} from '../actions';

const InitialState = {
  tab: ``,
  users: [],
  filteredUsers: [],
  page: 1,
  sort: {
    type: ``,
    value: ``,
  },
}

export const mainReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_LARGE_USERS:
      return Object.assign({}, state, {
        tab: action.payload.tab,
        users: action.payload.users,
        filteredUsers: action.payload.users,
        page: 1,
      });
    case ActionType.LOAD_SMALL_USERS:
      return Object.assign({}, state, {
        tab: action.payload.tab,
        users: action.payload.users,
        filteredUsers: action.payload.users,
        page: 1,
      });
    case ActionType.ADD_USER:
      return Object.assign({}, state, {
        users: [action.payload, ...state.users],
        filteredUsers: [action.payload, ...state.users],
      });
    case ActionType.CHANGE_PAGE:
      return Object.assign({}, state, {
        page: action.payload,
      });
    case ActionType.CHANGE_SORTING:
      return Object.assign({}, state, {
        filteredUsers: action.payload.users,
        sort: action.payload.sort,
      });
    case ActionType.FILTRATE_USERS:
      return Object.assign({}, state, {
        filteredUsers: action.payload,
        page: 1,
      });
  }

  return state;
}
