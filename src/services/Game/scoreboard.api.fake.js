const getScoreboard = () => JSON.parse(localStorage.getItem("scoreboard"));

const setScoreboard = (scoreboard) =>
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));

// saves a preconfigured scoreboard, if none exists, and returns it
const scoreboardFixture = () => {
    let scoreboard = getScoreboard();

    if (scoreboard === null || scoreboard === undefined) {
        scoreboard = [
            { playerName: "Filippo", victories: 3 },
            { playerName: "Saro", victories: 2 },
            { playerName: "Giovanni", victories: 7 },
        ];

        setScoreboard(scoreboard);
    }

    return scoreboard;
};

/**
 * If player exists, do nothing and always returns the scoreboard
 */
const initializePlayer = (playerName) => {
    let scoreboard = getScoreboard();

    if (scoreboard.findIndex((p) => p.playerName === playerName) < 0) {
        scoreboard.push({
            playerName,
            victories: 0,
        });

        setScoreboard(scoreboard);
    }

    return scoreboard;
};

/**
 *
 * @param {string} playerName
 * @returns {[]} the updated scoreboard
 */
const increasePlayerScore = (playerName) => {
    let scoreboard = getScoreboard();

    const mapIncrease = (p) => {
        if (p.playerName === playerName) {
            return {
                ...p,
                victories: p.victories + 1,
            };
        }
        return p;
    };

    scoreboard = scoreboard.map(mapIncrease);

    setScoreboard(scoreboard);

    return scoreboard;
};

const scoreboardAPIFake = {
    getScoreboard,
    setScoreboard,
    initializePlayer,
    increasePlayerScore,
    scoreboardFixture,
};

export default scoreboardAPIFake;
