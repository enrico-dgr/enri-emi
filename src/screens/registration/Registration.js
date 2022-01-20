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
            errorMessage: "",
        };
    }

    onChangeInput = (e) => {
        this.setState({
            inputText: e.target.value,
        });
    };

    addLocalStorage = () => {
        let newState = {};

        if (this.state.inputText === "") {
            newState.errorMessage = "Insert a name";
        } else {
            localStorage.setItem("playerName", this.state.inputText);
            this.props.onClickRegistration(this.state.inputText);
        }

        this.setState(newState);
        this.timeout = setTimeout(() => {
            this.setState({ errorMessage: "" });
        }, 3000);
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
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
                        <input
                            type="text"
                            placeholder={
                                this.state.errorMessage === ""
                                    ? "Player Name"
                                    : this.state.errorMessage
                            }
                            onChange={this.onChangeInput}
                            className={
                                this.state.errorMessage === "" ? "" : "bounce"
                            }
                        />
                        <button onClick={this.addLocalStorage}>GO!</button>
                    </div>
                    <div className={"rules-content"}>
                        <h1 className={"rules"}>How to play:</h1>
                        <img
                            src={rules}
                            alt="Rules"
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
