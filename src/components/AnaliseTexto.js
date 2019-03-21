import React, { Component } from 'react';
import axios from 'axios';

class AnaliseTexto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palavrasChave : [],
            lingua: '',
            sentimento: '',
            flag: false,
        }
    }
    
    componentDidMount = () => {
        if(this.state.flag === false) {
            this.handleLingua(this.props.descricao);
            this.handlePalavras(this.props.descricao);
            this.handleSentimento(this.props.descricao);
        }
    }

    handleLingua = descricao => {
        const key = "b7857a3c744e4b589098202a253ec8f5";
        axios({
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

        }).then (response => {
            this.setState({
                lingua : response.data.documents[0].detectedLanguages[0],
                flag: true,
            })
        })
        
    }

    handleSentimento = descricao => {
        const key = "b7857a3c744e4b589098202a253ec8f5";
        axios({
            method: 'post',
            url: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
            headers : {
                'Ocp-Apim-Subscription-Key' : key,
            },
            data : {
                "documents": [
                    {
                        // "language" : responseIdioma.iso6391Name,
                        "id" : "1",
                        "text" : descricao, 
                    }
                ]
            }
        }).then (response => {
            
            this.setState({
                sentimento : response.data.documents[0].score,
                flag: true,
            })
        })
    }

    handlePalavras = descricao => {
        const key = "b7857a3c744e4b589098202a253ec8f5";
        axios({
            method: 'post',
            url: 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
            headers : {
                'Ocp-Apim-Subscription-Key' : key,
            },
            data : {
                "documents" : [
                    {
                        // "language" : responseIdioma.iso6391Name,
                        "id" : "1",
                        "text" : descricao, 
                    }
                ]
            }, 
        }).then (response => {
            this.setState({
                palavrasChave : response.data.documents[0].keyPhrases,
                flag: true,
            })
        })
    }

    reRender = () =>{
        if(this.state.flag) {
            this.setState({flag: false});
        }
    }
    render () {
        window.setTimeout(this.reRender, 2000);
        return (
            <div>
                <strong style={{fontSize: '14px'}}>Lingua</strong> <br/>
                
                
                {this.state.lingua.name} - { this.state.lingua.iso6391Name}<br/><br/>
                
                
                
                <strong style={{fontSize: '14px'}}>Palavras Chaves</strong> <br/>
                {Object.entries(this.state.palavrasChave).map(([i, value]) => {
                    
                    return (
                        <span key={i} className="badge badge-primary ml-1">
                        {value}
                        
                        </span> 
                    )
                }) 
                }
                 <br/><br/>
                <strong style={{fontSize: '14px'}}>Sentimento</strong> <br/>
                <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${this.state.sentimento*100}%`}}>{parseInt(this.state.sentimento*100)}%</div>
                </div>
            </div>
        )
    }
}

export default AnaliseTexto;