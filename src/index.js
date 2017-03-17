import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router';
import Pets from './routes/pets/pets.js';
import Pet from './routes/pet/pet.js';
import reducer from './index/reducer';
import './index/styles/index.css';
import './index/styles/bulma.css';
import './index/styles/fonts.css';

const store = createStore(reducer);

render((
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route className="route" path="/" component={ Pets } />
      <Route className="route" path="/pet/:id" component={ Pet } />
    </Router>
  </Provider>
), document.getElementById('root'));
