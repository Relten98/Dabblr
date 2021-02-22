module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
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
    })
    return User
}
