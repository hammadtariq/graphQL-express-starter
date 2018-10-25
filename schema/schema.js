const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const books = [
  { id: "1", name: "book1", genre: "comedy" },
  { id: "2", name: "book2", genre: "spy" },
  { id: "3", name: "book3", genre: "sci-fic" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        // code to get data from db
        return books.find(elem => elem.id === args.id);
      }
    }
  }
});

// client side query params
// query: {
//     book(id: "2") {
//         name
//     }
// }
module.exports = new GraphQLSchema({ query: RootQuery });
