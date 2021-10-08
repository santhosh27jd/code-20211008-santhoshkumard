const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const app = express();
const PORT = 5050; // listening port
const productData = require("./CATALOG.json"); // Json data for product catalog
const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql // Initializing GraphQl


// Initializing product type
const ProductType = new GraphQLObjectType({
    name:"Product",
    fields:() => ({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        location:{type:GraphQLString},
        price:{type:GraphQLString}
    })
})

// Getting product
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllProduct:{
            type: new GraphQLList(ProductType),
            args:{id:{type: GraphQLInt}},
            resolve(parent, args){
                return productData
            }
        }
    }
})

// Creating product
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser:{
            type:ProductType,
            args:{
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                location:{type: GraphQLString},
                price:{type: GraphQLString},
            },
            resolve(parent, args){
                productData.push({id: productData.length + 1, name: args.name, description: args.description, location: args.location, price: args.price})
                return args
            }
        }
    }
})

// Configuring server
const schema = new graphql.GraphQLSchema({query: RootQuery, mutation: Mutation})

// cors for allow origin
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
//Starting server with listening port
app.listen(PORT,() => {
    console.log("Server is running");
})