const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const util = require('util');

const pkg_def = loader.loadSync(__dirname +
    '/../shared/grpc-recipe.proto');
const recipe = grpc.loadPackageDefinition(pkg_def).recipe;
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 8080;
const TARGET = process.env.TARGET || 'localhost:8080';
const client = new recipe.RecipeService(
    TARGET,
    grpc.credentials.createInsecure()
);

//client.getRecipe({id:42},(err, value) => {console.log(value)})

const getRecipe = util.promisify(client.getRecipe.bind(client));

(async () => {
    console.log( await getRecipe({id: 42}))
})()