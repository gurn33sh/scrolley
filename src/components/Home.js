import React, { createElement, useLayoutEffect, useState } from 'react'
// import one from '../one.jpg'
// import two from '../two.jpg'

function Vidorimg(props) {
    console.log('gggggggggggggggggggggggggg', props.status)
    console.log('ffffffffffffffffffffffffffffff', props.src)
    if (props.status === 'vid') {
        return (
            <div>
                <video controls autoPlay loop muted src={props.src} id='vid1' className="video-cont" preload="none">
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

    let mounted = true

    // let status = 'img'

    function test(par) {
        count++
        console.log("This is test", count, par)
    }

    const next = (par) => {
        //testing function
        console.log("button clicked", par)
        if (urls[count1].endsWith('.jpg')) {
            // img1.style = "display:block"
            // img1.src = urls[count1]
        }

        if (urls[count2].endsWith('.jpg')) {
            // status = 'img'
            // img2.style = "display:block"
            // img2.src = urls[count1]
        }

        // img1.src = urls[count1]
        // img2.src = urls[count2]
        console.log('kkkkkkkkkkkkkkkkk', urls[count1])
        console.log('jjjjjjjjjjjjjjjjj', urls[count2])

        if (urls[count1].endsWith('mp4')) {
            // status = 'vid'
            // img1.style = "display:none"
            // vid1.src = urls[count1]
            // vid1.style = "display:justify"
        }

        if (urls[count2].endsWith('mp4')) {
            // status= 'vid'
            // img2.style = "display:none"
            // vid2.src = urls[count2]
            // vid2.style = "display:justify"
        }

    }

    // const next = (par) => {
    //     console.log("Button clicked", par)
    //     let img1 = document.getElementById("img1")
    //     let img2 = document.getElementById("img2")
    //     let vid1 = document.getElementById("vid1")
    //     let vid2 = document.getElementById("vid2")

    //     vid1.style = "display:none"
    //     vid1.src = ""

    //     vid2.style = "display:none"
    //     vid2.src = ""

    //     count1 += 2
    //     count2 += 2
    //     if (urls[count1].endsWith('.jpg')) {
    //         img1.style = "display:block"
    //         img1.src = urls[count1]
    //     }

    //     if (urls[count2].endsWith('.jpg')) {
    //         status = 'img'
    //         img2.style = "display:block"
    //         img2.src = urls[count1]
    //     }

    //     // img1.src = urls[count1]
    //     // img2.src = urls[count2]
    //     console.log('kkkkkkkkkkkkkkkkk', urls[count1])
    //     console.log('jjjjjjjjjjjjjjjjj', urls[count2])

    //     if (urls[count1].endsWith('mp4')) {
    //         status = 'vid'
    //         img1.style = "display:none"
    //         vid1.src = urls[count1]
    //         vid1.style = "display:justify"
    //     }

    //     if (urls[count2].endsWith('mp4')) {
    //         status= 'vid'
    //         img2.style = "display:none"
    //         vid2.src = urls[count2]
    //         vid2.style = "display:justify"
    //     }
    // }

    const previous = (par) => {
        console.log("Button clicked", par)
        let img1 = document.getElementById("img1")
        let img2 = document.getElementById("img2")

        img1.src = urls[count1 -= 2]
        img2.src = urls[count2 -= 2]
    }

    const reload = async (par) => {
        console.log('button clicked', par)
        let resp = await fetch('http://localhost:5000/dev/reload')
        let data = await resp.json()
        urls = data
        console.log(urls)
    }

    const fetchImages = async () => {
        // fetch('http://localhost:5000/dev/images')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('data', data[0])
        //         return data
        //     })
        //     .catch((err) => {
        //         console.log(err, "Connection not established")
        //     })
        try {
            let resp = await fetch('http://localhost:5000/dev/images')
            let data = await resp.json()
            // urls = data
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
            // console.log('rrrrrrrr', resp)
            if (mounted) {
                console.log('mmmm', mounted)
                setUrls(resp)
                mounted = false
                console.log('mmmm', mounted)
                console.log('uuuuuuuuuuuuuuuuuuuuu', urls)
            }
            // let img1 = document.getElementById("img1")
            // console.log('ffffffffffffffff', img1)
            // let img2 = document.getElementById("img2")
            // img1.src = urls[0]
            // img2.src = urls[1]
            // console.log('sssssssssssssssssssss', urls)
            // console.log('ddddddddddddddddd', img1)
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

            {/* <button type="button" className="button" onClick={() => previous("previous")}>Previous</button>
            <button type="button" className="button" onClick={() => next("next")}>Next</button> <br />
            <button type="button" className="button" onClick={() => reload("reload")}>Reload</button> */}
        </div>
    )

    // return (
    //     <div>
    //         <h1> This is Home Component </h1>
    //         <img id="img1" className="picture" alt="img1" />
    //         <img id="img2" className="picture" alt="img2" /> <br />
    //         <video controls loop autoPlay id='vid1' style={{ display: "none" }} className="video-cont">
    //             <source type="video/mp4" />
    //             Your browser does not support the video tag.
    //         </video>
    //         <video controls loop autoPlay id='vid2' style={{ display: "none" }} className="video-cont">
    //             <source type="video/mp4" />
    //             Your browser does not support the video tag.
    //         </video>
    //         <button type="button" className="button" onClick={() => previous("previous")}>Previous</button>
    //         <button type="button" className="button" onClick={() => next("next")}>Next</button> <br />
    //         <button type="button" className="button" onClick={() => reload("reload")}>Reload</button>
    //     </div>
    // )
}

export default Home