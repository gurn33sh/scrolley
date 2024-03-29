import React, { useLayoutEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Image from './Image'
import Masonry from 'react-masonry-css'


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
            <Link to={`/g/${props.src}`} className="">
                <img id="img1" src={props.src} className="content" height={props.height} width={props.width} alt="img1" loading="lazy" />
            </Link>
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
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        800: 2
    };

    return (
        <div className="parent-container">
            <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
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
                    <div>
                        <Vidorimg src={asset.url} status={status} poster={asset.poster} height={asset.height} width={asset.width} />
                    </div>
                )
            })}
            {/* <button type="button" className="button" onClick={() => reload("reload")}>Reload</button> */}
            </Masonry >
        </div >
    )
}

export default Home