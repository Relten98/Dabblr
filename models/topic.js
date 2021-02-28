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
            foreignKey: { name: 'parentTopicID', allowNull: false },
        });
        models.topic.belongsTo(models.topic, {
            foreignKey: { name: 'parentTopicID', allowNull: false },
            as: 'parent',
        });
        models.topic.hasMany(models.tutorial, {
            foreignKey: { name: 'fk_topicID', allowNull: false },
            onDelete: 'cascade',
        });
    };

    // Parent and child
    Topic.getParent = (TopicID) =>
        Topic.findOne({
            where: { id: TopicID },
            include: {
                model: Topic,
                as: 'parent',
            },
            raw: true,
        });

    Topic.getChild = (currentTopicID) =>
        Topic.findAll({ where: { parentTopicID: currentTopicID }, raw: true });

    return Topic;
};
