#!/usr/bin/env node
const sharp = require('sharp')
const fs = require('fs')
const fetch = require('node-fetch')
const path = require('path')
const { url } = require('inspector')
const { redgifExtractor } = require('./redgifs_extractor')

//TODO: Check if file exists, then continue

// const fileName = "2f8LRGr.jpg"
const baseUrl = "https://www.reddit.com/r/"

function readJsonFile() {
    return fs.readFileSync('lp.json').toString()
}

async function redditUrlRequest(subreddit, previd) {
    console.log('previd', previd)
    const subreddit_url = baseUrl + subreddit + '.json' + '?after=t3_' + previd
    console.log(subreddit_url)
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
    let FINISHED = false
    let previd = ''
    let items = []
    let count = 0
    let temp = ''
    while (!FINISHED) {
        console.log(items.length)
        if (items.length === 0) {
            console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggg')
            let json_data = await redditUrlRequest(subreddit, previd)
            let data_items = json_data['data']['children']
            // console.log(items)
            Object.keys(data_items).map((key, ind) => {
                // console.log(data_items[key])
                items.push(data_items[key])
            })
            previd = data_items[data_items.length - 1]['data']['id']
            // previd = id
            count += 1
            console.log(count)
            // if (count === 3) { FINISHED = true }
            // console.log(typeof items)
        }
        else {
            count += 1
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
            try {
                temp = items[items.length - 1]['data']['id']
                console.log('ffffffffffffffffffffff',temp)
                let json_data = await redditUrlRequest(subreddit, previd)
                let data_items = json_data['data']['children']
                Object.keys(data_items).map((key, ind) => {
                    // console.log(data_items[key])
                    items.push(data_items[key])
                })
            } catch (err) {
                console.log(err)
            }
        }
        if (items.length > 1) { previd = items[items.length - 1]['data']['id'] }
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkk')
        console.log(count)

        Object.keys(items).map((key, ind) => {
            let item = items[key]['data']
            let link = item['url']
            console.log(link)
            let title = item['title'].replace(/[.,\/"?#!$%\^&\*;:{}=\-_`~()]/g,"")
            let name = item['name']
            let permalink = item['permalink'].split('/')
            if (link.endsWith(".jpg") || link.endsWith('.jpeg') || link.endsWith('.png') || link.endsWith('.webp')) {
                // let fileName = permalink[permalink.length - 2] + '(' + name + ')' + '.' + link.split('.')[link.split('.').length - 1]
                let fileName = title + ' (' + name + ')' + '.' + link.split('.')[link.split('.').length - 1]
                let exists = false
                // fs.access(path.join('images', fileName), (err) => {
                //     if (err === null) {
                //         console.log("File exists", filename)
                //         exists = true
                //     }
                // })
                // if (exists) {continue}
                try {
                    fetch(link)
                        .then((resp) => resp.arrayBuffer())
                        .then((imgData) => {
                            const buffer = Buffer.from(imgData);
                            fs.writeFile(path.join('images', fileName), buffer, (err) => {
                                // console.log('lengthhhhhhhhhhhhhhhhhhhhhhhhhh', typeof buffer)
                                if (err) { console.log(err) }
                                else { console.log(fileName, 'saved successfully') }
                            })
                        }).catch((err) => { console.log(err) })
                    // let imgData = await resp.arrayBuffer()

                } catch (err) { console.log(err) }
            }
            else if (link.includes("redgifs")) {
                redgifExtractor(link, name, title)
            }
            // console.log('gggggggggggggggggggggggg', id, link)
        })
        console.log(temp)
        if (count===2) {break}
        // break
        if (temp === previd) { FINISHED = true }
    }
    // console.log(items)
}

function resizeImage() {
    const fileName = "lp.jpg"
    console.log("Resizing...")
    const stats = fs.statSync(fileName)
    console.log("Size of " + fileName + "is: ", stats['size'] * 0.001 + " KB")

    fs.readFile(fileName, async (err, data) => {
        await sharp(data)
            .resize({ width: 400, height: 400, fit: 'fill' })
            .jpeg({ quality: 80 })
            .toBuffer()
            .then((data) => {
                fs.writeFile("resized.jpg", data, (err) => {
                    console.log(typeof data)
                    console.log(data.length * 0.001 + " KB")
                    if (err) { console.log("Error accured", err) }
                    else { console.log("Image is resized and saved as", "resized.jpg") }
                })
            })
    })
}

// resizeImage()
redditDownloader('kaylanilei')