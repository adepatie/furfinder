import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router';
import Pets from './routes/pets/pets.js';
import './index/index.css';
import './index/bulma.css';
import './index/fonts.css';


render((
  <Router history={ browserHistory }>
    <Route className="route" path="/" component={ Pets } />
  </Router>
), document.getElementById('root'));
