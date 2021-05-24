import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../store/actions';

const withUsers = (Component) => {
  class WithUsers extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        popupOpened: false,
        selectedUser: false,
      }

      this.onPopupOpening = this.onPopupOpening.bind(this);
      this.onPopupClosure = this.onPopupClosure.bind(this);
      this.popupKeydownClosure = this.popupKeydownClosure.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onSearch = this.onSearch.bind(this);
      this.onSelectUser = this.onSelectUser.bind(this);
    }

    onPopupOpening() {
      this.setState({popupOpened: true});
      document.addEventListener(`keydown`, this.popupKeydownClosure);
    }

    onPopupClosure() {
      this.setState({popupOpened: false});
      document.removeEventListener(`keydown`, this.popupKeydownClosure);
    }

    popupKeydownClosure(evt) {
      if (evt.keyCode === 27) {
        this.onPopupClosure();
      }
    }

    onInputChange(evt) {
      const {name, value} = evt.target;

      this.setState({[name]: value});
    }

    onSubmit(evt) {
      evt.preventDefault();
      
      this.props.addUser({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      });
      this.onPopupClosure();
    }

    onSearch(evt) {
      let result = [];

      this.props.users.map((elem) => {
        let showItem = false;

        const filtrateObject = {
          id: elem.id,
          firstName: elem.firstName,
          lastName: elem.lastName,
          email: elem.email,
          phone: elem.phone,
        }

        Object.values(filtrateObject).map((labels) => {
          if (labels.toString().includes(evt.target.value)) {
            showItem = true;
            return;
          }
        });

        showItem && result.push(elem);
      });

      this.props.filtrateUsers(result);
    }

    onSelectUser(user) {
      this.setState({selectedUser: user}, () => {
        document.location = `#user-info`;
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          popupOpened={this.state.popupOpened}
          selectedUser={this.state.selectedUser}
          onPopupOpening={this.onPopupOpening}
          onPopupClosure={this.onPopupClosure}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          onSearch={this.onSearch}
          onSelectUser={this.onSelectUser}
        />
      );
    }
  }

  const mapStateToProps = ({users, filteredUsers, page, sort}) => ({
    users,
    filteredUsers,
    page,
    sort,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    changePage(page) {
      dispatch(ActionCreator.changePage(page));
    },
  
    changeSorting(users, sort) {
      dispatch(ActionCreator.changeSorting(users, sort));
    },

    addUser(user) {
      dispatch(ActionCreator.addUser(user));
    },

    filtrateUsers(users) {
      dispatch(ActionCreator.filtrateUsers(users));
    },
  });

  WithUsers.propTypes = {
    users: PropTypes.array.isRequired,
    filteredUsers: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    sort: PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    changePage: PropTypes.func.isRequired,
    changeSorting: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    filtrateUsers: PropTypes.func.isRequired,
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithUsers);
}

export default withUsers;
