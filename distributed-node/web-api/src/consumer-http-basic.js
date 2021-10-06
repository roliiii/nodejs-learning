import fetch from "node-fetch";
import fastify from "fastify";

const server = fastify()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'

server.get('/', async ()=> {
    const resp = await fetch('http://localhost:4000/recipes/42')
    const data = await resp.json()

    return {
        consumer_pid : process.pid,
        data
    }
})

server.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`)
})