module.exports = (sequelize, DataTypes) => {
    let Vote = sequelize.define('vote', {
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
            foreignKey: 'fk_tutorialID',
            onDelete: 'CASCADE',
        });
        Vote.belongsTo(models.user, {
            foreignKey: 'fk_userID',
            onDelete: 'CASCADE',
        });
    };
    return Vote;
};
