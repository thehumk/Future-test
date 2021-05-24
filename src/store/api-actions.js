import {ActionCreator} from './actions';

export const loadLargeUsers = (loadIcon, controlButtons) => (dispatch, _getState, api) => (
  api.get(`?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    .then(({data}) => {
      loadIcon.style.display = `none`;
      for (let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].removeAttribute(`disabled`);
      }

      dispatch(ActionCreator.loadLargeUsers(data, `large`))
    })
    .catch((err) => {
      loadIcon.style.display = `none`;
      for (let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].removeAttribute(`disabled`);
      }

      alert(`Что-то пошло не так: ` + err);
      throw err;
    })
);

export const loadSmallUsers = (loadIcon, controlButtons) => (dispatch, _getState, api) => (
  api.get(`?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    .then(({data}) => {
      loadIcon.style.display = `none`;
      for (let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].removeAttribute(`disabled`);
      }

      dispatch(ActionCreator.loadSmallUsers(data, `small`))
    })
    .catch((err) => {
      loadIcon.style.display = `none`;
      for (let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].removeAttribute(`disabled`);
      }

      alert(`Что-то пошло не так: ` + err);
      throw err;
    })
);
