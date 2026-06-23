const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, 'schemas', 'management.graphql'), 'utf8')}
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Service Room Management siap di: ${url}`);
});