import React, { Component } from 'react';

class PainelEmocao extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
    }
    render () {
        return (
            <div className="row">
                {this.data.map(info => {
                    return (
                        <div className="col-md-3" key={info.userNome}>
                            <div className="card mt-3">
                                <div className="card-title text-center">
                                    {info.userNome}
                                </div>
                                <div className="card-body">
                                    {info.userDescricao}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PainelEmocao;