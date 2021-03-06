module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    User.associate = (models) => {
        models.user.hasMany(models.tutorial, {
            foreignKey: { name: 'fk_userID', allowNull: false },
        });
        models.user.hasMany(models.vote, {
            foreignKey: { name: 'fk_userID', allowNull: false },
        });
    };
    return User;
};
