import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      returnSpellCheck : '',
      data: [

      ]
    }
    this.speelCheck = this.speelCheck.bind(this);

    this.app = firebase.initializeApp(DB_config);
    this.db = this.app.database().ref().child('data');

  }


  async speelCheck  (nome, email, descricao)  {
    const key = '44696f4e806a4b7ab09d1519fc5e4e48';
   
    const response = await axios({
      method: 'get',
      url: `https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?text=${descricao}`,
      params : {
        'mkt':'pt-br',
        'mode' : 'proof'
      },
      headers : {
        'Ocp-Apim-Subscription-Key' : key,
      },
    });
    //   .then(response => {
    //     this.setState({
    //       returnSpellCheck : response.data.flaggedTokens,
    //     })
    //     console.log("ok spell check");
        
    // });
    
    await this.setState ({
      returnSpellCheck : response.data.flaggedTokens,
    })

    for(let i = 0; i < this.state.returnSpellCheck.length; i++) {
      let newStr = this.state.returnSpellCheck[i].suggestions[0].suggestion;
      let oldStr = this.state.returnSpellCheck[i].token;
      descricao = descricao.replace(oldStr, newStr);      
    }
  }
 

  render() {
    return (
      <BrowserRouter>
      <div  className="container">
        <Route path="/" exact component={() => <CorrecaoAutomatica speelCheck={this.speelCheck}/>} />
        <Route path="/painel" component={() => <PainelEmocao/>} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
