import "./App.css";

import React, { Component } from "react";

//Screens
import Game from "./screens/Game/Game.js";
import Registration from "./screens/Registration.js";
import ScoreboardTransition from "./screens/Game/ScoreboardTransition";
import Transition from "./components/classComponents/Transition";
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

    onExitTransition = () => {
        setTimeout(() => {
            this.setState({
                transition: false,
            });
        }, 750);
    };

    componentDidMount() {
        this.setState({
            scoreboard: fakeAPI.scoreboardFixture(),
        });
    }

    onExitGameTransition = () => {
        this.setState({
            isRegistered: true,
        });
        setTimeout(() => {
            this.setState({ gameTransition: false });
        }, 1000);
    };

    onClickRegistration = (playerName) => {
        // if player exists, it does nothing
        const scoreboard = fakeAPI.initializePlayer(playerName);

        this.setState({
            gameTransition: true,
            playerName,
            scoreboard,
        });
    };

    render() {
        return (
            <div className="project-enri-emi">
                <Transition
                    defaultClass={"transition-screen"}
                    enterClass={""}
                    exitClass={"transition-screen--exit"}
                    timeoutBeforeEnter={0}
                    timeoutBeforeExit={1000}
                    transitionOn={this.state.transition}
                    onExit={this.onExitTransition}
                />
                <ScoreboardTransition
                    transitionOn={this.state.gameTransition}
                    onExit={this.onExitGameTransition}
                />

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
