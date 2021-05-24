export const ActionType = {
  CHANGE_TAB: `changeTab`,
  LOAD_LARGE_USERS: `loadLargeUsers`,
  LOAD_SMALL_USERS: `loadSmallUsers`,
  ADD_USER: `addUser`,
  CHANGE_PAGE: `changePage`,
  CHANGE_SORTING: `changeSorting`,
  FILTRATE_USERS: `filtrateUsers`,
}

export const ActionCreator = {
  loadLargeUsers: (users, tab) => ({
    type: ActionType.LOAD_LARGE_USERS,
    payload: {users, tab},
  }),

  loadSmallUsers: (users, tab) => ({
    type: ActionType.LOAD_SMALL_USERS,
    payload: {users, tab},
  }),

  addUser: (user) => ({
    type: ActionType.ADD_USER,
    payload: user,
  }),

  changePage: (page) => ({
    type: ActionType.CHANGE_PAGE,
    payload: page,
  }),

  changeSorting: (users, sort) => ({
    type: ActionType.CHANGE_SORTING,
    payload: {users, sort},
  }),

  filtrateUsers: (users) => ({
    type: ActionType.FILTRATE_USERS,
    payload: users,
  })
}
