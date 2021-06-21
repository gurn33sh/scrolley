import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    },
    endpoint: 'http://192.168.1.3:9000',
    forcePathStyle: true,
    region: 'us-east-1'
})

export async function listObjects() {
    let urls = []
    try {
        const command = new ListObjectsV2Command({
            'Bucket': 'reddit-media'
        })
        const response = await client.send(command)
        if (response['$metadata']['httpStatusCode'] === 200) {
            console.log("Assets Recieved")
            response['Contents'].map( (val, ind) => {
                urls.push('http://192.168.1.3:9000/reddit-media/' + encodeURIComponent(val['Key']))
            })
        } else {
            console.log('Err', response)
        }
        return urls
    } catch (err) {
        console.log(err)
    }
}

// console.log(await listObjects())