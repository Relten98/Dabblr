module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define('tutorial', {
        tutorialName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
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
        submittedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    })
    Tutorial.associate = (models) => {
        models.tutorial.belongsTo(models.topic, {
            foreignKey: 'fk_topicID',
            onDelete: 'CASCADE',
        })
        models.tutorial.hasMany(models.vote, {
            foreignKey: 'fk_tutorialID',
        })
        models.tutorial.belongsTo(models.user, {
            foreignKey: 'fk_userID',
        })
    }
    return Tutorial
}
