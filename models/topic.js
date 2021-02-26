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
    Topic.getTopic = (topicID) => Topic.findOne({ where: { id: topicID } });
// Our handy call for the parent... I think
// I could just be a big-dumb-dummy
    Topic.getParent = (parentTopicID) => Topic.findOne({ where: { id: parentTopicID } })
    Topic.getChild = (childTopicID) => Topic.findOne({ where: { id: parentTopicID } })

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
