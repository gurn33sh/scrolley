#!/usr/bin/env node
const sharp = require('sharp')
const fs = require('fs')
const fetch = require('node-fetch')
const path = require('path')
const { url } = require('inspector')
const { redgifExtractor } = require('./redgifs_extractor')
const Fs = require('@supercharge/filesystem')
const { spawn } = require('child_process')

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

async function exists(path) {
    try {
        await Fs.access(path)
        return true
    } catch {
        return false
    }
}

async function redditDownloader(subreddit) {
    let FINISHED = false
    let previd = ''
    let items = []
    let count = 0
    let temp = ''
    let json_data
    if (await Fs.exists(subreddit)) {
        console.log("Directory exists", subreddit)
    } else {
        fs.mkdirSync(subreddit)
        fs.mkdirSync(path.join(subreddit, "images"))
        fs.mkdirSync(path.join(subreddit, "videos"))
        fs.mkdirSync(path.join(subreddit, "resized"))
    }
    while (!FINISHED) {
        console.log(items.length)
        if (items.length === 0) {
            console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggg')
            json_data = await redditUrlRequest(subreddit, previd)
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
                // temp = previd
                console.log('ffffffffffffffffffffff', temp)
                json_data = await redditUrlRequest(subreddit, previd)
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

        for (let item of items) {
            // console.log(item)
            // let item = items[key]['data']
            item = item['data']
            let link = item['url']
            console.log(link)
            let title = item['title'].replace(/[.,\/"?#!$%\^&\*;:{}=\-_`~()]/g, "")
            let name = item['name']
            let permalink = item['permalink'].split('/')
            if (link.endsWith(".jpg") || link.endsWith('.jpeg') || link.endsWith('.png') || link.endsWith('.webp')) {
                let fileName = permalink[permalink.length - 2] + '(' + name + ')' + '.' + link.split('.')[link.split('.').length - 1]
                // let fileName = title + ' (' + name + ')' + '.' + link.split('.')[link.split('.').length - 1]
                fileName = fileName.replace('/ /g', '_')
                let exists = await Fs.exists(path.join(path.join(subreddit, 'images'), fileName))
                if (exists) { console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', exists) }
                // fs.access(path.join('images', fileName), (err) => {
                //     if (err === null) {
                //         console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                //         console.log("File exists", fileName)
                //         exists = true
                //     }
                // })
                if (!exists) {
                    try {
                        fetch(link)
                            .then((resp) => resp.arrayBuffer())
                            .then((imgData) => {
                                const buffer = Buffer.from(imgData);
                                fs.writeFile(path.join(subreddit, path.join('images', fileName)), buffer, (err) => {
                                    // console.log('lengthhhhhhhhhhhhhhhhhhhhhhhhhh', typeof buffer)
                                    if (err) { console.log(err) }
                                    else { console.log(fileName, 'saved successfully') }
                                })
                            }).catch((err) => { console.log(err) })
                            // resizeImage(subreddit, fileName)
                        // let imgData = await resp.arrayBuffer()

                    } catch (err) { console.log(err) }
                }
                else {
                    console.log("File Already present not downloaded")
                }
            }
            else if (link.includes("redgifs")) {
                redgifExtractor(link, name, title, subreddit)
            }
            // items = []
            // console.log('gggggggggggggggggggggggg', id, link)
            else {
                vidDownloader(link, path.join(subreddit, 'videos'))
            }
        }
        console.log('ggggggggggggggggggggggggg', temp)
        if (json_data['data']['after'] === null) { console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn Now after is null"); process.exit() }
        // if (count===2) {break}
        // break
        if (temp === previd) {
            console.log('temp', temp)
            console.log('previd', previd)
            console.log("Completly scrapped")
            FINISHED = true
            // process.exit()
            // break
        }
    }
    // console.log(items)
}

async function vidDownloader(url, videos_path) {
    console.log("Yyyyyyyyyyyyyyyyyyyy", 'youtube-dl in da house')
    const ydl = spawn('youtube-dl', ['-o', path.join(videos_path, '%(id)s.%(ext)s'), url])

    ydl.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ydl.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ydl.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function resizeImage(subreddit, fileName) {
    // fileName = fileName.replace(/(\s+)/g, '\\$1')
    // console.log(escape(fileName))
    // process.exit()
    const dir_path = path.join(subreddit, 'resized')
    console.log("Resizing...")
    const stats = fs.statSync(path.join(path.join(subreddit, 'images'), fileName))
    console.log("Size of " + fileName + "is: ", stats['size'] * 0.001 + " KB")

    fs.readFile(path.join(path.join(subreddit, 'images'), fileName), async (err, data) => {
        await sharp(data)
            .resize({ width: 400, height: 400, fit: 'fill' })
            .jpeg({ quality: 80 })
            .toBuffer()
            .then((data) => {
                fs.writeFile(path.join(dir_path, fileName), data, (err) => {
                    console.log(data.length * 0.001 + " KB")
                    if (err) { console.log("Error accured", err) }
                    else { console.log("Image is resized and saved as", "resized.jpg") }
                })
            })
    })
}

// resizeImage()
redditDownloader('wallpapers')
// vidDownloader("https://www.redgifs.com/watch/digitalblackarmyworm", 'lp')