import "./registration.css"

import { Component } from 'react/cjs/react.production.min';

//Components

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false
        }
    }

    render() {
        return (
            <div className="registration">
                <div
                    className="registration-bg">
                </div>
                <div className="content">
                    <h1 className="title">
                        Rock Scissors Paper<br />&<br /> Lizard Spock
                    </h1>
                    <div className="enter-game">
                        <input type="text" placeholder="Player Name">

                        </input>
                        <div className="enter-game__button" >GO!</div>
                    </div>
                    <div
                        className="img-rules">
                    </div>
                </div>
            </div >
        );
    }
}

export default Registration;