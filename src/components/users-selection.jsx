import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadLargeUsers, loadSmallUsers} from '../store/api-actions';

const UsersSelection = ({tab, loadUsers}) => {
  return (
    <section className="selection">
      <h2 className="selection__title">Выберете набор данных</h2>

      <div className="selection__container">
        <button
          className="selection__control"
          onClick={(evt) => {
            const loadIcon = evt.target.querySelector(`.selection__load-icon`);
            const controlButtons = evt.target.parentElement.querySelectorAll(`.selection__control`);

            for (let i = 0; i < controlButtons.length; i++) {
              controlButtons[i].setAttribute(`disabled`, `disabled`);
            }
            
            loadIcon.style.display = `block`;
            loadUsers(loadSmallUsers, loadIcon, controlButtons);
          }}
          disabled={tab === `small` ? `disabled` : ``}>
          <span className="selection__load-icon">⧖</span>
          Маленький
        </button>
        <button
          className="selection__control"
          onClick={(evt) => {
            const loadIcon = evt.target.querySelector(`.selection__load-icon`);
            const controlButtons = evt.target.parentElement.querySelectorAll(`.selection__control`);

            for (let i = 0; i < controlButtons.length; i++) {
              controlButtons[i].setAttribute(`disabled`, `disabled`);
            }

            loadIcon.style.display = `block`;
            loadUsers(loadLargeUsers, loadIcon, controlButtons);
          }}
          disabled={tab === `large` ? `disabled` : ``}>
          <span className="selection__load-icon">⧖</span>
          Большой
        </button>
      </div>
    </section>
  );
}

const mapStateToProps = ({tab}) => ({
  tab,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers(func, loadIcon, controlButtons) {
    dispatch(func(loadIcon, controlButtons));
  },
});

UsersSelection.propTypes = {
  tab: PropTypes.string.isRequired,
  loadUsers: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSelection);
