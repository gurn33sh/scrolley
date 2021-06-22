import express from 'express'
import sequelize from './services/db.js'
import Subreddit from './models/Subreddit.js'
import Asset from './models/Asset.js'
import { listObjects } from './services/store.js'
import cors from 'cors'
import path from 'path'

const api = express()

api.use(cors())

api.get('/', (req, res) => {
    res.send({"message": "Recieved"})
})

api.get('/dev/images', cors(), async (req, res) => {
    // const urls = await listObjects()
    // console.log(req.query.subreddit)
    // Implementing Database access
    let urls = []
    let results = await Asset.findAll({
        // limit: 20,
        order: sequelize.random()
    })
    results = JSON.parse(JSON.stringify(results))
    for (const result in results) {
        urls.push({
            url: 'http://192.168.1.3:9000/reddit-media/' + results[result]['resized_url'],
            poster: results[result]['Poster']
        })
    }
    res.send(urls)
})

api.get('/dev/favicon.ico', cors(), (req, res) => {
    const __dirname = path.resolve()
    res.sendFile('favicon.png', {root: path.join(__dirname)})
})

api.get('/dev/reload', (req, res) => {
    res.send({'message': 'Under Development'})
})

// Database is synced...
// await sequelize.sync({force: true})

api.listen(5000, () => {console.log("server listening on port 3000")})