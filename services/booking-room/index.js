const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, 'schemas', 'booking.graphql'), 'utf8')}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return { message: err.message };
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Service Booking Room siap di: ${url}`);
});