import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import CorrecaoAutomatica from './components/CorrecaoAutomatica';
import PainelEmocao from './components/PainelEmocao';


class App extends Component {
  constructor(props) {
    super(props);
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
