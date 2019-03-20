import React, { Component } from 'react';

class PainelEmocao extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
    }
    render () {
        return (
            <div>
                {this.data.map(info => {
                    return (
                        <div>
                            {info.userNome}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PainelEmocao;