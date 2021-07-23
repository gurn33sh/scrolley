export default function Image({match}) {
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", match.params.id)
    let url = `http://192.168.1.3:9000/reddit-media/subreddits/${match.params.subreddit}/${match.params.type}/${match.params.id}`
    console.log(url)
    return (
        <img src={url} alt={match.params.id} className="full-img"></img>
    )
}