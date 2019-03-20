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

    addUser = e => {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(this.state.inputNome.length < 3) {
            alert("O nome é muito curto");
        } else if (!re.test(String(this.state.inputEmail).toLowerCase()) ) {
            alert("Email invalido");
        } else if (this.state.inputDescricao.length < 3) {
            alert("Adicione uma descrição");
        } else {
            e.preventDefault();
            this.props.addUser(this.state.inputNome, this.state.inputEmail, this.state.inputDescricao);
        }
    }

    handleChanges = (id, value) => {
        if(id === "nome"){
            console.log("set nome")
            this.setState({
                inputNome: value,
            })
        }else if(id === "email"){
            console.log("set setemail")
            this.setState({
                inputEmail: value,
            })
        }else {
            console.log("set descricao")
            this.setState({
                inputDescricao: value,
            })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Informe seu nome"
                            onChange={event => this.handleChanges(event.target.id, event.target.value)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="nome@exemplo.com"
                            onChange={event => this.handleChanges(event.target.id, event.target.value)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            className="form-control"
                            id="descricao"
                            rows="3"
                            onChange={event => this.handleChanges(event.target.id, event.target.value)}
                            />
                        
                    </div>
                    <button
                        style={{float: 'right'}}
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.addUser(e)}
                        >Enviar</button>
                </form>
            </div>
        );
    }
}

export default CorrecaoAutomatica;