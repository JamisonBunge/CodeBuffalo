import React, { Component } from 'react';


class ProgressBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: 0
        }
    }
    render() {

        console.log(this.props)
        return (
            <div className="progress-bar" >
                <Filler percentage={(this.props.currentQuestion / this.props.totalQuestions) * 100} />
            </div>
        );
    }
}


const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }}></div>
}
export default ProgressBar