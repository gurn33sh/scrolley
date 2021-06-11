import React, { createElement, useLayoutEffect, useState } from 'react'

function Vidorimg(props) {
    console.log('gggggggggggggggggggggggggg', props.status)
    console.log('ffffffffffffffffffffffffffffff', props.src)
    if (props.status === 'vid') {
        return (
            <div>
                <video controls autoPlay loop muted src={props.src} id='vid1' onmouseover={(event) => this.event.target.play()} onmouseout={() => this.event.target.pause()} className="video-cont" preload="none">
                    <source type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }
    else if (props.status === 'img') {
        return <img id="img1" src={props.src} className="picture" alt="img1" loading="lazy" />
    }
}

function Home() {
    let [urls, setUrls] = useState([])
    let count = 0
    let count1 = 0
    let count2 = 1

    const reload = async (par) => {
        console.log('button clicked', par)
        let resp = await fetch('http://localhost:5000/dev/reload')
        let data = await resp.json()
        urls = data
        console.log(urls)
    }

    const fetchImages = async () => {
        try {
            let resp = await fetch('http://localhost:5000/dev/images')
            let data = await resp.json()
            console.log('pppppppppppppppppppp', data[0])
            return data
        } catch (error) {
            console.log("error", error)
            return null
        }
    }

    useLayoutEffect(() => {
        async function fetchData() {
            let resp = await fetchImages()
            console.log('mmmm', mounted)
            setUrls(resp)
            console.log('mmmm', mounted)
            console.log('uuuuuuuuuuuuuuuuuuuuu', urls)
            console.log("This is test")
        }
        fetchData()
    }, [])

    return (
        <div>
            {console.log('kkkkkkkkkkkkkk', urls)}
            {urls.map((url) => {
                let status = 'img'
                console.log("This is testing url gurneesh singh chahal", url)
                if (url.endsWith('.jpg')) {
                    status = 'img'
                }
                else {
                    status = 'vid'
                }
                return (
                    <Vidorimg src={url} status={status} />
                )
            })}
            <button type="button" className="button" onClick={() => reload("reload")}>Reload</button> */}
        </div>
    )
}

export default Home