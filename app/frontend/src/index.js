import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import './Styles/Buttons.css';
import './Styles/Scroll.css';
import './Styles/Popup.css';
import './Styles/MyTeam.css';
import './Styles/Containers.css';
import './Styles/Card.css';
import './Styles/Images.css';
import './Styles/Dashboard.css';
import './Styles/MultiLevelSelector.css';
import './Styles/BatsmanMenu.css';
import './Styles/Pitch.css';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import Theme from './Styles/Theme.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App.js';
import { ThemeProvider } from '@material-ui/core/styles';

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <CssBaseline/>
      <App />,
    </ThemeProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
