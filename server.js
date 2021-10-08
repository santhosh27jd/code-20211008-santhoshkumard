const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const app = express();
const PORT = 5050;
//const userData = require("./MOCKDATA.json")
const productData = require("./CATALOG.json")
const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql



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

const schema = new graphql.GraphQLSchema({query: RootQuery, mutation: Mutation})

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(PORT,() => {
    console.log("Server is running");
})