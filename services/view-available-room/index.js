const { ApolloServer, gql } = require('apollo-server');
    const fs = require('fs');
    const path = require('path');
    const resolvers = require('./resolvers');

    const typeDefs = gql`
      ${fs.readFileSync(path.join(__dirname, 'schemas', 'room.graphql'), 'utf8')}
    `;

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen({ port: 4001 }).then(({ url }) => {
      console.log(`🚀 Service Booking Room siap di: ${url}`);
    });