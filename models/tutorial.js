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
        TopicID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
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
    // Tutorial.associate = (models) => {
    //     Tutorial.belongsTo(models.Topic, {
    //         foreignKey: 'fk_topicID',
    //         onDelete: 'CASCADE',
    //     })
    // }
    return Tutorial
}
