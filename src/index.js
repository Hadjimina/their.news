import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faExclamation, faSearch, faQuestion, faSpinner, faInfoCircle, faRandom,  } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

library.add( faExclamation, faSearch, faQuestion, faSpinner, faInfoCircle, faRandom, )

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,
  document.getElementById('root')
);
