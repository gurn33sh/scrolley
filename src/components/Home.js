import React, { useLayoutEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Vidorimg(props) {
    console.log('gggggggggggggggggggggggggg', props.status)
    console.log('ffffffffffffffffffffffffffffff', props.src)
    if (props.status === 'vid') {
        return (
            <video controls loop muted src={props.src} id='vid1' onMouseOver={(event) => { event.target.play() }} onMouseOut={(event) => { event.target.pause() }} className="content" height="400" widt="400" preload="none" poster={props.poster}>
                <source type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )
    }
    else if (props.status === 'img') {
        return (
            <img id="img1" src={props.src} className="content" height={props.height} width="400" alt="img1" loading="lazy" />
        )
    }
}

function Home() {
    let [urls, setUrls] = useState([])

    // const reload = async (par) => {
    //     try {
    //         console.log('button clicked', par)
    //         await fetch('http://192.168.1.3:5000/dev/reload')
    //         console.log(urls)
    //         window.location.reload(false)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

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

    const classes = useStyles();

    return (
        <div className="parent-container">
            {console.log('kkkkkkkkkkkkkk', urls['urls'])}
            {urls.map((asset, index) => {
                console.log('ppppppppppppppppppppppppppp', asset.height)
                console.log('ooooooooooooooooooooooooooo', asset.width)
                let status = 'img'
                if (asset.url.endsWith('.jpg') || asset.url.endsWith('jpeg') || asset.url.endsWith('png')) {
                    status = 'img'
                }
                else {
                    status = 'vid'
                }
                return (
                    <Vidorimg src={asset.url} status={status} poster={asset.poster} height={asset.height} width={asset.width} />
                )
            })}
            {/* <button type="button" className="button" onClick={() => reload("reload")}>Reload</button> */}
        </div>
    )
}

export default Home