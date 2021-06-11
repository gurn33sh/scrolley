import React, { useLayoutEffect, useState } from 'react'

function Vidorimg(props) {
    console.log('gggggggggggggggggggggggggg', props.status)
    console.log('ffffffffffffffffffffffffffffff', props.src)
    if (props.status === 'vid') {
        return (
            <div>
                <video controls loop muted src={props.src} id='vid1' onMouseOver={(event) => {event.target.play()}} onMouseOut={(event) => {event.target.pause()}} className="video-cont" preload="none">
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

    const reload = async (par) => {
        try {
            console.log('button clicked', par)
            await fetch('http://192.168.1.3:5000/dev/reload')
            console.log(urls)
            window.location.reload(false)
        } catch(error) {
            console.log(error)
        }
    }

    const fetchImages = async () => {
        try {
            let resp = await fetch('http://192.168.1.3:5000/dev/images')
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
            setUrls(resp)
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
            <button type="button" className="button" onClick={() => reload("reload")}>Reload</button>
        </div>
    )
}

export default Home