#!/usr/bin/env node

const server = require("fastify")()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '4000'

console.log(`worker pid=${process.pid}`)

server.get('/recipes/:id', async (req, reply) => {
    console.log(`worker request pid=${process.pid}`)
    const id = Number(req.params.id)
    if(id !== 42){
        reply.statusCode = 404;
        return {
            error: "not_found"
        }
    }
    return {
        producer_id : process.pid,
        recipe: {
            id,
            name : "Tikka Masala",
            steps: "Throw it in a pot...",
            ingredients: [
                {id:1, name:'Chicken', quantity: "1 kg"},
                {id:2, name:'Sauce', quantity: "2 cup"}
            ]
        }
    }

})

server.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`)
})