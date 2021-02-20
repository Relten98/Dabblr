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
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        submittedBy: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    })
    return Tutorial
}
