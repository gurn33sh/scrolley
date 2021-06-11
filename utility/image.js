#!/usr/bin/env node
const sharp = require('sharp')
const fs = require('fs')
const fetch = require('node-fetch')

const fileName = "2f8LRGr.jpg"
const baseUrl = "https://www.reddit.com/r/"

function readJsonFile() {
    return fs.readFileSync('lp.json').toString()
}

async function redditUrlRequest(subreddit) {
    const subreddit_url = baseUrl + subreddit + '.json'
    let FINISHED = false
    try {
        const resp = await fetch(subreddit_url)
        const json_data = await resp.json()
        // let json_data = JSON.parse(readJsonFile())
        return json_data
        // console.log(json_data)
    } catch (err) {
        console.log(err)
        return null
    }
}

async function redditDownloader(subreddit) {
    let json_data = await redditUrlRequest('lenaPaul')
    let data_items = json_data['data']['children']
    let items = Object.keys(data_items).map((key, ind) => {
        // console.log(data_items[key])
    })
    let id = data_items[data_items.length - 1]['data']['id']
    console.log(id)
}

function resizeImage() {
    console.log("Resizing...")
    const stats = fs.statSync(fileName)
    console.log("Size of " + fileName + "is: ", stats['size'] * 0.001 + " KB")

    fs.readFile(fileName, async (err, data) => {
        await sharp(data)
            .resize({ width: 700, height: 700, fit: 'fill' })
            .jpeg({ quality: 80 })
            .toBuffer()
            .then((data) => {
                fs.writeFile("resized.jpg", data, (err) => {
                    console.log(data.length * 0.001 + " KB")
                    if (err) { console.log("Error accured", err) }
                    else { console.log("Image is resized and saved as", "resized.jpg") }
                })
            })
    })
}

// resizeImage()
redditDownloader('gurneesh')