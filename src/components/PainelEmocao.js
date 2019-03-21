import React, { Component } from 'react';
import axios from 'axios';
import AnaliseTexto from './AnaliseTexto';

class PainelEmocao extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render () { 
        return (
            <div className="row">
                {
                    this.data.map(info => { 
                        return (
                            <div className="col-md-3" key={info.userNome}>
                            
                                <div className="card mt-3">
                                    <div className="card-header text-center text-white bg-primary" style={{paddingTop: '20px'}}>
                                        
                                        <h6>{info.userNome}</h6> 
                                        
                                    </div>
                                    <div className="card-body">
                                        <strong style={{fontSize: '14px'}}>Email</strong><br/>
                                        {info.userEmail}<br/><br/>
                                        <strong style={{fontSize: '14px'}}>Descrição</strong> <br/>
                                        {info.userDescricao} <br/><br/>
                                        <AnaliseTexto descricao={info.userDescricao}/>
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