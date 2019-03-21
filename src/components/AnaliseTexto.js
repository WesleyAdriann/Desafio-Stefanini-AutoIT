import React, { Component } from 'react';

class AnaliseTexto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info : this.props.info
        }
    }
    render () {
        return (
            <div>
                {console.log(this.state.info.responseSentimento)}
            </div>
        )
    }
}

export default AnaliseTexto;