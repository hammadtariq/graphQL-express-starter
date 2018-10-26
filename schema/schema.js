const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// dummy data
const books = [
  { id: "1", name: "book1", genre: "comedy", authorId: "1" },
  { id: "4", name: "book11", genre: "comedy", authorId: "1" },
  { id: "5", name: "book111", genre: "comedy", authorId: "1" },
  { id: "2", name: "book2", genre: "spy", authorId: "2" },
  { id: "3", name: "book3", genre: "sci-fic", authorId: "3" }
];

const authors = [
  { id: "1", name: "author1", age: 24 },
  { id: "2", name: "author2", age: 37 },
  { id: "3", name: "author3", age: 45 }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find(elem => elem.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        return books.filter(elem => elem.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db
        return books.find(elem => elem.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db
        return authors.find(elem => elem.id === args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // code to get data from db
        return authors;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from db
        return books;
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
