const Queries = 'author(_id: Int, firstName: String, lastName: String): [Author]';

const Mutations = `
    createAuthor(
      firstName: String
      lastName: String!
    ): Author
`;

const Types = `
  type Author {
    _id: Int
    firstName: String
    lastName: String
    books: [Book]
    deleted: Boolean
    deletedAt: Int
  }
`;
export const schema = {
  qry: Queries,
  mut: Mutations,
  typ: Types
};
