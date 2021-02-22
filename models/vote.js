module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('vote', {
        voteTutorial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        voteType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
                isIn: [[1, -1]],
            },
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    })
    return Vote
}
