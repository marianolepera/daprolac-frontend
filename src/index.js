import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import './styles/index.css';
import App from './containers/App';
import { store, persistor } from './store/store';

ReactDOM.render(
  <Provider store = { store } >
    <PersistGate loading = { null } persistor = { persistor } >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
