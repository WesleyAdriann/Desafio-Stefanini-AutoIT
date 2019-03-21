import React, { Component } from 'react';
import axios from 'axios';

class AnaliseTexto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palavrasChave : '',
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
        const key = "9a1b21c339c1401e8c486ca264d333f5";
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
                lingua : response.data.documents[0].detectedLanguages,
                flag: true,
            })
        })
        
    }

    handleSentimento = descricao => {
        const key = "9a1b21c339c1401e8c486ca264d333f5";
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
            console.log(response);
            this.setState({
                sentimento : response.data.documents[0].score,
                flag: true,
            })
        })
    }

    handlePalavras = descricao => {
        const key = "9a1b21c339c1401e8c486ca264d333f5";
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
                <strong style={{fontSize: '14px'}}>Sentimento</strong> <br/>
                <div className="progress">
                <div class="progress-bar" role="progressbar" style={{width: `${this.state.sentimento*100}%`}}>{parseInt(this.state.sentimento*100)}%</div>
                </div>
            </div>
        )
    }
}

export default AnaliseTexto;