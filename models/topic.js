module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('topic', {
        topicName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1],
            },
        },
        parentTopicID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    })

    Topic.associate = (models) => {
        console.log('models ', models)
        models.topic.hasMany(models.tutorial, {
            onDelete: 'cascade',
        })
    }
    return Topic
}
