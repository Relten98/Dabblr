module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define('tutorial', {
        tutorialType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                isIn: [['video', 'article', 'paidVideo', 'paidArticle']],
            },
        },
        tutorialLink: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true,
            },
        },
    });

    Tutorial.associate = (models) => {
        Tutorial.belongsTo(models.topic, {
            foreignKey: 'fk_topicID',
            onDelete: 'CASCADE',
        });
        Tutorial.hasMany(models.vote, {
            foreignKey: 'fk_tutorialID',
        });
        Tutorial.belongsTo(models.user, {
            foreignKey: 'fk_userID',
        });
    };
    return Tutorial;
};
