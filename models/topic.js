module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('topic', {
        topicName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        parentTopicID: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: 'Personal',
        },
    })
    return Topic
}
