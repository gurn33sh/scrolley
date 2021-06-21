import sequelize from '../services/db.js'
import { Sequelize } from 'sequelize'
const { DataTypes } = Sequelize

const Subreddit = sequelize.define('Subreddit', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isNSFW: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    PostsDownloaded: {
        type: DataTypes.INTEGER,
    },
    lastID: {
        type: DataTypes.STRING,
    }
})

// await sequelize.sync({ force: true });
// const LenaPaul = Subreddit.build({
//     Name: 'lenapaul',
//     isNSFW: true,
// })
// await LenaPaul.save()
// console.log('lenapaul is added to Database')

export default Subreddit