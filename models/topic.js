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
    })

    Topic.associate = (models) => {
        models.topic.hasOne(models.topic, {
            foreignKey: 'parentTopicID',
        })
        models.topic.belongsTo(models.topic, {
            foreignKey: 'parentTopicID',
        })
        models.topic.hasMany(models.tutorial, {
            foreignKey: 'fk_topicID',
            onDelete: 'cascade',
        })
    }
    return Topic
}
