const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Authors {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Books {
    title: String!
    published: Int!
    author: Authors!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genres: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
    recommendedBooks: [Books!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      ): Books!
    editAuthor(name: String!, setBornTo: Int!): Authors
    createUser(username: String! password: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genres) {
        return Book.find({}).populate("author");
      }

      if (args.author && !args.genres) {
        const foundAuthor = await Author.findOne({ name: args.author });
        return await Book.find({ author: foundAuthor }).populate("author");
      }

      if (!args.author && args.genres) {
        return await Book.find({ genres: { $in: args.genres } }).populate(
          "author"
        );
      }

      const foundAuthor = await Author.findOne({ name: args.author });
      return await Book.find({
        author: foundAuthor,
        genres: args.genres,
      }).populate("author");
    },
    allAuthors: async (root, args) => await Author.find({}),
    me: (root, args, context) => context.currentUser,
    recommendedBooks: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const foundBooks = await Book.find({
        genres: { $in: currentUser.favoriteGenre },
      }).populate("author");

      return foundBooks;
    },
  },

  Authors: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: foundAuthor });
      return foundBooks.length;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const foundAuthor = await Author.findOne({ name: args.author });
      const foundBook = await Book.findOne({ title: args.title });
      if (!foundAuthor) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        });
        try {
          await newAuthor.save();
          return new Book({ ...args, author: newAuthor }).save();
        } catch (error) {
          throw new GraphQLError("failed to create author", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }

      if (foundBook) {
        throw new GraphQLError("Book already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      try {
        return new Book({ ...args, author: foundAuthor }).save();
      } catch (error) {
        throw new GraphQLError("failed to create book", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    editAuthor: async (root, args) => {
      if (!args.name || !args.setBornTo) {
        throw new GraphQLError("Author name is required", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      try {
        foundAuthor.born = args.setBornTo;
        return foundAuthor.save();
      } catch (error) {
        throw new GraphQLError("failed to update author", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    createUser: async (root, args) => {
      const author = await Author.findOne({ name: args.username });

      if (author) {
        throw new GraphQLError("Username already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      if (!args.username || !args.password || !args.favoriteGenre) {
        throw new GraphQLError("All fields are required", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      if (args.username.length < 3) {
        throw new GraphQLError("Username must be at least 3 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      if (args.password.length < 3) {
        throw new GraphQLError("Password must be at least 3 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.password,
          },
        });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash,
      });

      try {
        return newUser.save();
      } catch (error) {
        throw new GraphQLError("failed to create user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      if (!args.username || !args.password) {
        throw new GraphQLError("All fields are required", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      const user = await User.findOne({ username: args.username });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
