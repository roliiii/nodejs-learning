import fetch from "node-fetch";
import fastify from "fastify";
import fs from "fs";
import https from "https"

const server = fastify()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'

const options = {
    agent: new https.Agent({
        ca: fs.readFileSync(__dirname+'/../../shared/tls/basic-certificate.cert'),
    })
};

server.get('/', async ()=> {
    const resp = await fetch('https://localhost:4000/recipes/42', options)
    const data = await resp.json()

    return {
        consumer_pid : process.pid,
        data
    }
})

server.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`)
})