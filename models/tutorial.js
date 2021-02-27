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
            foreignKey: { name: 'fk_topicID', allowNull: false },
            onDelete: 'CASCADE',
        });
        Tutorial.hasMany(models.vote, {
            foreignKey: { name: 'fk_tutorialID', allowNull: false },
        });
        Tutorial.belongsTo(models.user, {
            foreignKey: { name: 'fk_userID', allowNull: false },
        });
    };
    return Tutorial;
};
