import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import axios from 'axios';


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
    this.addUser = this.addUser.bind(this);

    this.app = firebase.initializeApp(DB_config);
    this.db = this.app.database().ref().child('data');

  }

  componentDidMount() {
    this.addUser();
  }

  addUser = (nome, email, descricao) => {
    const test = 'nao sei';
    const key = '44696f4e806a4b7ab09d1519fc5e4e48';
   

    axios({
      method: 'post',
      url: 'https://api.cognitive.microsoft.com/bing/v7.0/spellcheck',
      params : {
        'mkt':'pt-br',
        
      },
      headers : {
        'Ocp-Apim-Subscription-Key' : key,
        'Content-Length' : test.length + 5,
      },
      data : {
        'text' : test
      }

    }).then(response => console.log(response));


    // // axios.post('https://api.cognitive.microsoft.com/bing/v5.0/spellcheck',
    // //   params : {
    // //     'mkt':'pt-br',
    // //     'mode':'proof'
    // //   },
    // //   headers : {
    // //     'Ocp-Apim-Subscription-Key' : key,
    // //   },
    // //   data = {
    // //     'text' : `${descricao}`,
    // //   }
    // // ).then(response => console.log(response));

  }

  render() {
    return (
      <BrowserRouter>
      <div  className="container">
        <Route path="/" exact component={() => <CorrecaoAutomatica addUser={this.addUser}/>} />
        <Route path="/painel" component={() => <PainelEmocao/>} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
