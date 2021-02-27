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
    });
    Topic.getTopic = (topicID) =>
        Topic.findOne({ where: { id: topicID }, raw: true });

    Topic.associate = (models) => {
        models.topic.hasOne(models.topic, {
            foreignKey: 'parentTopicID',
        });
        models.topic.belongsTo(models.topic, {
            foreignKey: 'parentTopicID',
        });
        models.topic.hasMany(models.tutorial, {
            foreignKey: 'fk_topicID',
            onDelete: 'cascade',
        })
    }
    Topic.getParent = (parentTopicID) => Topic.findOne({ where: { id: parentTopicID } });

    Topic.getChild = (childTopicID) => Topic.findOne({ where: { id: parentTopicID } });
    
    return Topic
}
