import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {mainReducer} from './store/reducers/reducer';
import './sass/style.scss';
import App from './App';

const api = createAPI();

const store = createStore(
  mainReducer,
  applyMiddleware(thunk.withExtraArgument(api)),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
