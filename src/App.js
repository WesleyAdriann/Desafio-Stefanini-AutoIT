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
      data: []
    }
    this.spellCheck = this.spellCheck.bind(this);
    this.addUser = this.addUser.bind(this);

    this.app = firebase.initializeApp(DB_config);
    this.db = this.app.database().ref().child('data')

  }

  componentDidMount = () => {
    const { data } = this.state;
    this.db.on('child_added', snap => {
      data.push({
        userNome: snap.val().userNome,
        userEmail: snap.val().userEmail,
        userDescricao : snap.val().userDescricao,
      })
      this.setState({data});
    });
  }

  async spellCheck  (nome, email, descricao)  {
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

    this.addUser(nome, email, descricao);
  }
 
  addUser = (nome, email, descricao) => {
    this.db.push().set({
      userNome: nome,
      userEmail: email,
      userDescricao : descricao,
    }, err => {
      if(err) {
        alert("Não foi possivel adicionar.")
      }else {
        alert("Adicionado com sucesso");
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link to="/" className="nav-link">Correcao Texto</Link>
              </li>
              <li className="nav-item">
                <Link to="/painel" className="nav-link">Painel</Link>
              </li>
            </ul>
          </div>
        </nav>
      <div  className="container">
        <div className="col">
            <Route path="/" exact component={() => <CorrecaoAutomatica spellCheck={this.spellCheck}/>} />
            <Route path="/painel" component={() => <PainelEmocao data={this.state.data}/>} />
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
