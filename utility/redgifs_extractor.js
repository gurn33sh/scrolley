const fetch = require('node-fetch') 
const path = require('path')
const fs = require('fs')

async function downloader(name, url, reddit_name, reddit_title) {
    reddit_title = reddit_title.replace(/[.,\/"?#!$%\^&\*;:{}=\-_`~()]/g,"")
    fetch(url)
    .then( (resp) => resp.arrayBuffer())
    .then( (data) => {
        const buffer = Buffer.from(data)
        fs.writeFile(path.join('videos', name + '_' + reddit_name + '_' + reddit_title  + '.mp4'), buffer, (err) => {
            if (err) {console.log(err)}
            else {console.log("redgif saved successfully")}
        })
    })
}

async function redgifExtractor(url, reddit_name, reddit_title) {
    url = url.split('/')
    const name = url[url.length -1]
    console.log(url[url.length -1])
    const api_url = "https://api.redgifs.com/v1/gfycats/" + name
    try {
    const resp = await fetch(api_url)
    const json_data = await resp.json()
    const mp4Url = (json_data['gfyItem']['mobileUrl'])
    await downloader(name, mp4Url, reddit_name, reddit_title)
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

