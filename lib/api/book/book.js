
const Queries = `
    book(_id: Int, title: String, deleted: Boolean): [Book]
`;

const Mutations = `
    ###  Create a book record.
    ####  Example :
    #    mutation createBook($title: String!, $content: String!, $pages: Int!, $authorId: Int!, $deletion: Boolean!) {
    #      createBook(title: $title, content: $content, pages: $pages, authorId: $authorId, deleted: $deletion) {
    #        _id
    #        title
    #        content
    #        pages
    #        deleted
    #      }
    #    }
    #    {
    #      "title": "GG2",
    #      "content": "HHH2",
    #      "pages": "666",
    #      "authorId": 1,
    #      "deletion": false
    #    }
    createBook(
      title: String!
      content: String!
      pages: Int!
      authorId: Int!
      deleted: Boolean
    ): Book

    ###  Update a book record.
    ####  Example :
    #     mutation updateBook($_id: Int!, $title: String!) {
    #       updateBook(_id: $_id, title: $title) {
    #         _id
    #         title
    #       }
    #     }
    #     {
    #       "_id": 53,
    #       "title": "The New New Book"
    #     }
    updateBook(
      _id: Int!
      title: String
      content: String
      pages: Int
      authorId: Int
    ): Book

    hideBook(
      _id: Int!
      deleted: Boolean
      deletedAt: Int
    ): Book
`;

const Types = `
    ###  Specification of a book record.
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
