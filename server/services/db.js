import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('Gallery', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    await sequelize.authenticate()
    console.log('Connection has been established')
} catch (err) {
    console.log('Unable to connect to Database', err)
}

const syncDB = async () => await sequelize.sync( {force: true });

export default sequelize