const typeDefinitions = `
  type Author {
    id: Int
    firstName: String
    lastName: String
    posts: [Post]
  }
  type Post {
    _id: Int
    title: String
    content: String
    views: Int
    author: Author
  }
  type Query {
    posts(_id: Int): [Post]
    author(firstName: String, lastName: String): Author
  }
  type RootMutation {
    createAuthor(
      firstName: String!
      lastName: String!
    ): Author
    createPost(
      tags: [String!]!
      title: String!
      content: String!
      authorId: Int!
    ): Post
  }
  schema {
    query: Query,
    mutation: RootMutation
  }
`;

export default [ typeDefinitions ];

/*
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  _id: Int
  title: String
  content: String
  views: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String): Author
}
type RootMutation {
  createAuthor(
    firstName: String!
    lastName: String!
  ): Author
  createPost(
    tags: [String!]!
    title: String!
    content: String!
    authorId: Int!
  ): Post
}
schema {
  query: Query,
  mutation: RootMutation
}
*/
