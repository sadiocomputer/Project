import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//import du fichier style (scss et boostrap)
import './styles/index.scss' ;
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' ;
import '../node_modules/bootstrap/dist/js/bootstrap.min.js' ;



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


