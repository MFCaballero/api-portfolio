const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('rating', {
        score: {
            type: DataTypes.INTEGER,
            validate: {
                isbtw1and5: (value) => {
                  if(value < 6 && value > 0) return true
                  else return false
                }
            },
            allowNull: false,
        },
        comment : {
            type: DataTypes.STRING(16384),
        }

    });
};