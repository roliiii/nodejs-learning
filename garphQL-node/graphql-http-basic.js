#!/usr/bin/env node

const fs = require('fs');
const server = require('fastify')()
const graphql = require('fastify-gql');

const schema = fs.readFileSync(__dirname + '/graphql-schema.gql').toString();

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '4000'

console.log(`worker pid=${process.pid}`)

const resolvers = {
    Query: {
        pid: () => process.pid,
        recipe: async(_obj, { id }) => {
            if (id != 42) throw new Error(`recipe ${id} not found`);
            return {
                id,
                name: "Chicken Tikka Masala",
                steps: "Throw it in a pot...",
            }
        }
    },
    Recipe: {
        ingredients: async(obj) => {
            return (obj.id != 42) ? [] : [
                { id: 1, name: "Chicken", quantity: "1 lb", },
                { id: 2, name: "Sauce", quantity: "2 cups", }
            ]
        }
    }
};

server
    .register(graphql, { schema, resolvers, graphiql: true })
    .listen(PORT, HOST, () => {
        console.log(`Producer running at http://${HOST}:${PORT}/graphql`);
    });