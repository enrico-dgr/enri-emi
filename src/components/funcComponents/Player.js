import "./player.css";

import PropTypes from "prop-types";
import React from "react";

const Player = (props) => {
    return (
        <div className="player">
            <span className="player__position">{props.index + 1}.</span>
            <span className="player__name">{props.playerName}</span>

            <span className="player__score">{props.score}</span>
        </div>
    );
};

Player.propTypes = {
    playerName: PropTypes.string.isRequired,

    score: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};

export default Player;
