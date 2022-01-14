import "./App.css";

import React, { Component } from "react";

//Screens
import Game from "./screens/Game.js";
import Registration from "./screens/Registration.js";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistered: false,
            transition: true,
            transitionClass: "",
        };
    }

    transitionOff = () => {
        setTimeout(() => {
            this.setState({
                transition: false,
            });
        }, 750);
    };

    enterAnim = () => {
        setTimeout(() => {
            this.setState({
                transitionClass: "transition-screen-enter",
            });
            this.transitionOff();
        }, 1000);
    };

    componentDidMount() {
        this.enterAnim();
    }

    render() {
        return (
            <div className="project-enri-emi">
                {this.state.transition && (
                    <div
                        className={`transition-screen ${this.state.transitionClass}`}
                    ></div>
                )}
                {this.state.isRegistered === false && <Registration />}
                {this.state.isRegistered && <Game />}
            </div>
        );
    }
}

export default App;
