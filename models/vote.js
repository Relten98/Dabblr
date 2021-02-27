module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('vote', {
        voteType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
                isIn: [[1, -1]],
            },
        },
    });
    // Vote.getVotes = (tutorialID) => Votes.findOne({ where: { id: topicID } });

    Vote.associate = (models) => {
        Vote.belongsTo(models.tutorial, {
            foreignKey: { name: 'fk_tutorialID', allowNull: false },
            onDelete: 'CASCADE',
        });
        Vote.belongsTo(models.user, {
            foreignKey: { name: 'fk_userID', allowNull: false },
            onDelete: 'CASCADE',
        });
    };
    return Vote;
};
