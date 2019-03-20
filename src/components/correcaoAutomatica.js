import React, { Component } from 'react';

class CorrecaoAutomatica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNome: '',
            inputEmail: '',
            inputDescricao: '',
        }
    }
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label for="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" placeholder="Informe seu nome"/>
                    </div>

                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="nome@exemplo.com"/>
                    </div>

                    <div className="form-group">
                        <label for="descricao">Descrição</label>
                        <textarea  className="form-control" id="descricao" rows="3"/>
                        
                    </div>
                    <button style={{float: 'right'}} type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        );
    }
}

export default CorrecaoAutomatica;