import "./scoreboard.css";

import PlayerComp from "./Player";
import PropTypes from "prop-types";
import React from "react";
import Searchbar from "./Searchbar";

const Player = (p, index) => (
    <div key={p.playerName + p.index} style={{ width: "100%" }}>
        <PlayerComp
            playerName={p.playerName}
            score={p.victories}
            index={p.position}
        />
    </div>
);

const sort = (p1, p2) => p2.victories - p1.victories;

const map = (p, i) => {
    return { ...p, position: i };
};

const filter = (query) => (p) => {
    return p.playerName.toLowerCase().includes(query);
};

// needed not to run query.toLowerCase() on each call
const getFilter = (query) => {
    return filter(query.toLowerCase());
};

const Scoreboard = (props) => {
    const [query, setQuery] = React.useState("");

    return (
        <div className={"scoreboard"}>
            <p>Player: {props.playerName}</p>
            <div className={"scoreboard__buttons"}>
                <button onClick={props.onClickNewMatch}>New Match</button>
                <button onClick={props.onClickLogout}>Logout</button>
            </div>
            <Searchbar onChange={setQuery} />
            <div className={"scoreboard__list"}>
                {props.scores
                    .sort(sort)
                    .map(map)
                    .filter(getFilter(query))
                    .map(Player)}
            </div>
        </div>
    );
};

Scoreboard.propTypes = {
    onClickLogout: PropTypes.func.isRequired,
    onClickNewMatch: PropTypes.func.isRequired,
    playerName: PropTypes.string.isRequired,
    scores: PropTypes.array.isRequired,
};

export default Scoreboard;
