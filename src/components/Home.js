import React, { createElement, useLayoutEffect } from 'react'
// import one from '../one.jpg'
// import two from '../two.jpg'

function Vidorimg(props) {
    console.log('gggggggggggggggggggggggggg', props.status)
    if (props.status == 'vid') {
        return <video controls loop autoPlay src={props.src} id='vid1' style={{ display: "none" }} className="video-cont">
                    <source type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
    }
    return <img id="img1" src={props.src} className="picture" alt="img1" />
}

function Home() {
    let urls = []
    let count = 0
    let count1 = 0
    let count2 = 1

    let status = 'img'

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
            status = 'img'
            // img2.style = "display:block"
            // img2.src = urls[count1]
        }

        // img1.src = urls[count1]
        // img2.src = urls[count2]
        console.log('kkkkkkkkkkkkkkkkk', urls[count1])
        console.log('jjjjjjjjjjjjjjjjj', urls[count2])

        if (urls[count1].endsWith('mp4')) {
            status = 'vid'
            // img1.style = "display:none"
            // vid1.src = urls[count1]
            // vid1.style = "display:justify"
        }

        if (urls[count2].endsWith('mp4')) {
            status= 'vid'
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
        //         urls = data
        //         console.log(urls[0])
        //     })
        //     .catch((err) => {
        //         console.log(err, "Connection not established")
        //     })
        try {
            let resp = await fetch('http://localhost:5000/dev/images')
            let data = await resp.json()
            urls = data
            console.log('pppppppppppppppppppp', urls)
        } catch (error) {
            console.log("error", error)
        }
    }

    useLayoutEffect(async () => {
        await fetchImages()
        // async function fetchData() {
        //     await fetchImages()
        //     let img1 = document.getElementById("img1")
        //     console.log('ffffffffffffffff', img1)
        //     let img2 = document.getElementById("img2")
        //     img1.src = urls[0]
        //     img2.src = urls[1]
        //     console.log('sssssssssssssssssssss', urls)
        //     console.log('ddddddddddddddddd', img1)
        //     console.log("This is test")
        // }
        // fetchData()
    }, [fetchImages, urls])

    return (
        <div>
            <Vidorimg status={status} src={urls[0]}/>
            <button type="button" className="button" onClick={() => previous("previous")}>Previous</button>
            <button type="button" className="button" onClick={() => next("next")}>Next</button> <br />
            <button type="button" className="button" onClick={() => reload("reload")}>Reload</button>
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