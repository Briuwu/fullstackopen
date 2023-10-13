import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`;

export const GET_SPECIFIC_BOOKS = gql`
  query getSpecificBooks($genres: String!) {
    allBooks(genres: $genres) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const GET_RECOMMENDED_BOOKS = gql`
  query recommendedBooks {
    recommendedBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const GET_ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    me {
      username
      favoriteGenre
      id
    }
  }
`;
