import "./registration.css";

import { Component } from "react/cjs/react.production.min";
import rules from "../assets/img/rules.png";

//Components

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="registration">
                <div className="registration-bg"></div>
                <div className="content">
                    <h1 className="title">
                        Rock Scissors Paper
                        <br />&<br /> Lizard Spock
                    </h1>
                    <div className="enter-game">
                        <input type="text" placeholder="Player Name"></input>
                        <button>GO!</button>
                    </div>

                    <img
                        src={rules}
                        alt="Rules"
                        // size 500 x 413, so 500/413=350/290
                        // then it will be scaled based on device
                        width="350"
                        height="290"
                    />
                </div>
            </div>
        );
    }
}

export default Registration;
