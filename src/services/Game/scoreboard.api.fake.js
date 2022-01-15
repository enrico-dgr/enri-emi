const getScoreboard = () => JSON.parse(localStorage.getItem("scoreboard"));

const setScoreboard = (scoreboard) =>
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));

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

module.exports = {
    getScoreboard,
    setScoreboard,
    increasePlayerScore,
};
