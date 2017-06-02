
const Queries = `
    book(_id: Int, title: String, deleted: Boolean): [Book]
    ball(_id: Int, title: String, deleted: Boolean): [Book]
`;

const Mutations = `
    createBook(
      title: String!
      content: String!
      pages: Int!
      authorId: Int
      deleted: Boolean
    ): Book

    updateBook(
      _id: Int!
      title: String!
      content: String!
      pages: Int!
      authorId: Int
    ): Book

    hideBook(
      _id: Int!
      deleted: Boolean
      deletedAt: Int
    ): Book
`;

const Types = `
    type Book {
      _id: Int
      title: String
      content: String
      pages: Int
      author: Author
      deleted: Boolean
      deletedAt: Int
    }
`;

export const schema = {
  qry: Queries,
  mut: Mutations,
  typ: Types
};
