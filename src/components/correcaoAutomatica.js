import React, { Component } from 'react';

class CorrecaoAutomatica extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label for="name">Nome</label>
                        <input type="text" className="form-control" id="name" placeholder="Informe seu nome"/>
                    </div>

                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="nome@exemplo.com"/>
                    </div>

                    <div className="form-group">
                        <label for="description">Descrição</label>
                        <textarea  className="form-control" id="description" rows="3"/>
                        
                    </div>
                </form>
            </div>
        );
    }
}

export default CorrecaoAutomatica;