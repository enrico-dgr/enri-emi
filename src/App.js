import "./App.css";

import React, { Component } from "react";

//Screens
import Game from "./screens/Game.js";
import Registration from "./screens/Registration.js";

class App extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.state = {
            isRegistered: false,
            playerName: "",
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

        // fake API call
        let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

        if (scoreboard === null) {
            localStorage.setItem(
                "scoreboard",
                JSON.stringify([
                    { playerName: "Filippo", victories: 3 },
                    { playerName: "Saro", victories: 2 },
                    { playerName: "Giovanni", victories: 7 },
                ])
            );
        }
    }

    onClickRegistration = (playerName) => {
        this.setState({ isRegistered: true, playerName });

        let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
        if (scoreboard.findIndex((p) => p.playerName === playerName) < 0) {
            scoreboard.push({
                playerName,
                victories: 0,
            });
        }
        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    };

    render() {
        return (
            <div className="project-enri-emi">
                {this.state.transition && (
                    <div
                        className={`transition-screen ${this.state.transitionClass}`}
                    ></div>
                )}
                {this.state.isRegistered === false && (
                    <Registration
                        onClickRegistration={this.onClickRegistration}
                    />
                )}
                {this.state.isRegistered && (
                    <Game playerName={this.state.playerName} />
                )}
            </div>
        );
    }
}

export default App;
