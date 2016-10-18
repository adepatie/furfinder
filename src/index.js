import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router'
import Pets from './routes/pets/pets.js';
import './index.css';
import './bulma.css';


render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Pets } />
  </Router>
), document.getElementById('root'));
