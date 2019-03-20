import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';


import CorrecaoAutomatica from './components/CorrecaoAutomatica';
import PainelEmocao from './components/PainelEmocao';

import firebase from 'firebase';
import 'firebase/database';
import { DB_config } from './config/config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [

      ]
    }

    this.app = firebase.initializeApp(DB_config);
    this.db = this.app.database().ref().child('data');

  }

  render() {
    return (
      <BrowserRouter>
      <div  className="container">
        <Route path="/" exact component={() => <CorrecaoAutomatica/>} />
        <Route path="/painel" component={() => <PainelEmocao/>} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
