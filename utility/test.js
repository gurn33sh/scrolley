const fs = require('fs')

async function test() {
    try {
    fs.access("C:\\Users\\Gurneesh\\Desktop\\Desktop\\DESKTOP2\\src\\serverless_flask\\scrolller-flask\\utility\\EnormousDetaildedPterosaurs-mobile.mp4", (err) => {
        console.log(err['code'])
    })
}catch (err){
    console.log(err)
}
}

test()