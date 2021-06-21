import sequelize from '../services/db.js'
import { Sequelize } from 'sequelize'
const { DataTypes } = Sequelize

const Asset = sequelize.define('Asset', {
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Reddit_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Reddit_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    Poster: {
        type: DataTypes.STRING
    },
    bucket_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Asset