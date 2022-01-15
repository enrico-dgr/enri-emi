import "./App.css";

import React, { Component } from "react";

//Screens
import Game from "./screens/Game.js";
import Registration from "./screens/Registration.js";
import fakeAPI from "./services/Game/scoreboard.api.fake";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistered: false,
            playerName: "",
            scoreboard: [],
            transition: true,
            transitionClass: "",
            gameTransition: false,
            gameTransitionClass: "",
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
        this.setState({
            scoreboard: fakeAPI.scoreboardFixture(),
        });
    }

    gameTransitionDisable = () => {
        setTimeout(() => {
            this.setState({ gameTransition: false });
        }, 1000);
    };

    gameTransitionExit = () => {
        setTimeout(() => {
            this.setState({
                gameTransitionClass: "game-transition-screen--exit",
                isRegistered: true,
            });
            this.gameTransitionDisable();
        }, 2000);
    };

    onClickRegistration = (playerName) => {
        // if player exists, it does nothing
        const scoreboard = fakeAPI.initializePlayer(playerName);

        this.setState({
            gameTransition: true,
            playerName,
            scoreboard,
        });

        setTimeout(() => {
            this.setState({
                gameTransitionClass: "game-transition-screen--enter",
            });
            this.gameTransitionExit();
        }, 10);
    };

    render() {
        return (
            <div className="project-enri-emi">
                {this.state.transition && (
                    <div
                        className={`transition-screen ${this.state.transitionClass}`}
                    ></div>
                )}
                {this.state.gameTransition && (
                    <div
                        className={`game-transition-screen ${this.state.gameTransitionClass}`}
                    ></div>
                )}
                {this.state.isRegistered === false && (
                    <Registration
                        onClickRegistration={this.onClickRegistration}
                    />
                )}
                {this.state.isRegistered && (
                    <Game
                        playerName={this.state.playerName}
                        scoreboard={this.state.scoreboard}
                    />
                )}
            </div>
        );
    }
}

export default App;
