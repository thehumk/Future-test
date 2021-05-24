import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({selectedUser}) => {
  const {firstName, lastName, address, description} = selectedUser;

  return (
    <section className="users__select-user">
      <a name="user-info"></a>
      <h2>Выбран пользователь <b>{firstName + ` ` + lastName}</b></h2>
      <textarea className="users__textarea" defaultValue={description || `Нет описания`} readOnly></textarea>
      <p>Адрес проживания: <b>{address ? address.streetAddress : `неизвестно`}</b></p>
      <p>Город <b>{address ? address.city : `неизвестно`}</b></p>
      <p>Провинция/штат: <b>{address ? address.state : `неизвестно`}</b></p>
      <p>Индекс: <b>{address ? address.zip : `неизвестно`}</b></p>
    </section>
  )
}

UserInfo.propTypes = {
  selectedUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.shape({
      streetAddress: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
    description: PropTypes.string,
  }).isRequired,
}

export default UserInfo;
