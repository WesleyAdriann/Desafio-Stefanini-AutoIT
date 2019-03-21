import React, { Component } from 'react';
import axios from 'axios';
import AnaliseTexto from './AnaliseTexto';

class PainelEmocao extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.state = {
            idioma : [],
        }
        this.handleDescricao = this.handleDescricao.bind(this);
    }

    async handleDescricao (descricao) {
        const key = "9a1b21c339c1401e8c486ca264d333f5";
        
        let responseIdioma = await axios({
            method: 'post',
            url: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.0/languages',
            headers : {
                'Ocp-Apim-Subscription-Key' : key,
            },
            data : {
                "documents" : [
                    {
                        "id" : "1",
                        "text" : descricao,
                    }
                ]
            },

        })
        responseIdioma = responseIdioma.data.documents[0].detectedLanguages;
        let responseFrases = await axios({
            method: 'post',
            url: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
            headers : {
                'Ocp-Apim-Subscription-Key' : key,
            },
            data : {
                "documents" : [
                    {
                        "language" : responseIdioma.iso6391Name,
                        "id" : "1",
                        "text" : descricao, 
                    }
                ]
            },
        })
        responseFrases = responseFrases.data.documents[0].keyPhrases;

        let responseSentimento = await axios({
            method: 'post',
            url: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
            headers : {
                'Ocp-Apim-Subscription-Key' : key,
            },
            data : {
                "documents": [
                    {
                        "language" : responseIdioma.iso6391Name,
                        "id" : "1",
                        "text" : descricao, 
                    }
                ]
            }
        })
        responseSentimento = responseSentimento.data.documents[0].score;
        
        const completeInfos = {responseIdioma, responseFrases, responseSentimento};
        console.log(completeInfos);
        return (completeInfos);
            
    }



    render () {   
        return (
            <div className="row">
                {
                    this.data.map(info => { 
                        let newInfos = this.handleDescricao(info.userDescricao);
                        
                        
                        return (
                            <div className="col-md-3" key={info.userNome}>
                            
                                <div className="card mt-3">
                                    <div className="card-title text-center">
                                        <b>Nome</b><br/> 
                                        <span className="badge badge-primary"><h6>{info.userNome}</h6> </span><br/>
                                        
                                    </div>
                                    <div className="card-body">
                                        Email <br/>
                                        {info.userEmail}<br/>
                                        Descrição <br/>
                                        {info.userDescricao} <br/>
                                        <AnaliseTexto info={newInfos}/>
                                    </div>
                                </div>
                            </div>
                        )
                        
                    })
                }
                
            </div>
        );
    }
}

export default PainelEmocao;