import React from 'react';
import PropTypes from 'prop-types';
import {usersSorting} from '../utils';
import {SortType} from '../const';
import withUsers from '../hocs/with-users';
import InputMask from 'react-input-mask';
import UserInfo from './user-info';

const Users = ({filteredUsers, page, sort, changePage, changeSorting, popupOpened, selectedUser, onPopupOpening, onPopupClosure, onInputChange, onSubmit, onSearch, onSelectUser}) => {
  return (
    <div className="users">
      <div className="users__container">
        <label>
          <div>Поиск:</div> 
          <input type="text" className="users__search" onChange={onSearch}/>
        </label>
        <button className="users__add-btn" onClick={onPopupOpening}>Добавить пользователя</button>
        {popupOpened && (
          <div className="users__overlay-container" onClick={onPopupClosure}>
            <form className="users__add-user" onClick={(evt) => evt.stopPropagation()} onSubmit={onSubmit}>
              <button type="button" className="users__close-icon" onClick={onPopupClosure}></button>
              <label className="users__label">
                <div>Id:</div>
                <input type="number" name="id" onChange={onInputChange} required/>
                </label>
              <label className="users__label">
                <div>Имя:</div>
                <input type="text" name="firstName" onChange={onInputChange} required/>
                </label>
              <label className="users__label">
                <div>Фамилия:</div>
                <input type="text" name="lastName" onChange={onInputChange} required/>
                </label>
              <label className="users__label">
                <div>Почта:</div>
                <input type="email" name="email" onChange={onInputChange} required/>
              </label>
              <label className="users__label">
                <div>Телефон:</div>
                <InputMask
                  mask="(999)999-9999"
                  maskChar=""
                  type="tel"
                  name="phone"
                  onChange={onInputChange}
                  minLength={13}
                  required
                />
              </label>
              <button type="submit" className="users__submit-btn">Добавить</button>
            </form>
          </div>
        )}
      </div>
      <table className="users__table">
        <thead>
          <tr>
            {Object.values(SortType).map((elem, i) => (
              <th key={i} className="users__head-item" onClick={() => {
                console.log(elem, sort.value)
                const sortType = sort.value === elem ?
                  (sort.type === `ascending` ? `descending` : `ascending`)
                  :
                  `ascending`;
                changeSorting(usersSorting(filteredUsers, elem, sortType), {value: elem, type: sortType});
              }}>
                {elem}
                <span className="users__sort-icon">▼</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.slice(50 * (page - 1), 50 * page - 1).map((elem, i) => (
            <tr key={i} onClick={() => {
              onSelectUser(elem);
            }}>
              <td className="users__item">{elem.id}</td>
              <td className="users__item">{elem.firstName}</td>
              <td className="users__item">{elem.lastName}</td>
              <td className="users__item">{elem.email}</td>
              <td className="users__item">{elem.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="users__pagination">
        {page > 1 && (
          <a href="#" className="users__pagination-link" onClick={() => {
            changePage(1);
          }}>{`<<`}</a>
        )}
        {page > 1 && (
          <a href="#" className="users__pagination-link" onClick={() => {
            changePage(page - 1);
          }}>{`<`}</a>
        )}

        <a href="#" className="users__pagination-link">{page}</a>

        {filteredUsers.length / 50 > page && (
          <a href="#" className="users__pagination-link" onClick={() => {
            changePage(page + 1);
          }}>{`>`}</a>
        )}
        {filteredUsers.length / 50 > page && (
          <a href="#" className="users__pagination-link" onClick={() => {
            changePage(Math.ceil(filteredUsers.length / 50));
          }}>{`>>`}</a>
        )}
      </div>
      {selectedUser !== false && (
        <UserInfo selectedUser={selectedUser}/>
      )}
    </div>
  );
}

Users.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  sort: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  changePage: PropTypes.func.isRequired,
  changeSorting: PropTypes.func.isRequired,
  popupOpened: PropTypes.bool.isRequired,
  selectedUser: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.shape({
        streetAddress: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
      }),
      description: PropTypes.string,
    })
  ]).isRequired,
  onPopupOpening: PropTypes.func.isRequired,
  onPopupClosure: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
}

export default withUsers(Users);
