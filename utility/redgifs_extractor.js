const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
const Fs = require('@supercharge/filesystem')

async function downloader(name, url, reddit_name, reddit_title, subreddit) {
    reddit_title = reddit_title.replace(/[.,\/"?#!$%\^&\*;:{}=\-_`~()]/g, "")
    let fileName = path.join(subreddit, path.join('videos', name + '_' + reddit_name + '_' + reddit_title + '.mp4'))
    console.log(fileName)
    let exists = await Fs.exists(fileName)
    if (exists) { console.log('lllllllllllllllllllllllllllllllllllll', exists) }
    fetch(url)
        .then((resp) => resp.arrayBuffer())
        .then((data) => {
            const buffer = Buffer.from(data)
            // fs.access(path.join('videos', fileName), (err) => {
            //     if (err === null) {
            //         console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
            //         console.log("File exists", fileName)
            //         exists = true
            //     }
            // })
            if (!exists) {
                fs.writeFile(fileName, buffer, (err) => {
                    if (err) { console.log(err) }
                    else { console.log("redgif saved successfully") }
                })
            }
        })
}

async function redgifExtractor(url, reddit_name, reddit_title, subreddit) {
    url = url.split('/')
    const name = url[url.length - 1]
    console.log(url[url.length - 1])
    const api_url = "https://api.redgifs.com/v1/gfycats/" + name
    try {
        const resp = await fetch(api_url)
        const json_data = await resp.json()
        const mp4Url = (json_data['gfyItem']['mobileUrl'])
        await downloader(name, mp4Url, reddit_name, reddit_title, subreddit)
    } catch (err) {
        console.log(err)
    }
}

//redgifExtractor("https://redgifs.com/watch/muddyaccuratetigermoth")
//https://www.redgifs.com/watch/snoopyyellowlamprey

module.exports = {
    redgifExtractor: redgifExtractor,
    downloader: downloader
}

