module.exports = (sequelize, DataTypes) => {
    const Problem = sequelize.define('Problem', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Problem;
}