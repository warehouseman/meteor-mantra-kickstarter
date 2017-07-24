const Queries = `
    dummy(id: Int): [Dummy]
`;

const Mutations = `
`;

const Types = `

    scalar DateTime

    scalar Date

    scalar Time

    type Dummy {
        dummyId: Int
    }

`;

export const schema = {
  qry: Queries,
  mut: Mutations,
  typ: Types
};
