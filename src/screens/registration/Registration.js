import "./registration.css";

import { Component } from "react";
import PropTypes from "prop-types";
import rules from "../../assets/img/rules.png";

//Components

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
        };
    }

    onChangeInput = (e) => {
        this.setState({
            inputText: e.target.value,
        });
    };

    addLocalStorage = () => {
        localStorage.setItem("playerName", this.state.inputText);
        this.props.onClickRegistration(this.state.inputText);
    };

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
                        <input
                            type="text"
                            placeholder="Player Name"
                            onChange={this.onChangeInput}
                        />
                        <button onClick={this.addLocalStorage}>GO!</button>
                    </div>
                    <div className={"rules-content"}>
                        <h1 className={"rules"}>How to play:</h1>
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
            </div>
        );
    }
}

Registration.defaultProps = {
    onClickRegistration: () => undefined,
};

Registration.propTypes = {
    onClickRegistration: PropTypes.func,
};

export default Registration;
