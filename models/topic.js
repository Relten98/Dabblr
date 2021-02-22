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
        Topic.hasMany(models.Post, {
            onDelete: 'cascade',
        })
    }
    return Topic
}
