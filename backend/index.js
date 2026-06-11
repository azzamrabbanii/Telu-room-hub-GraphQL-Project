// console.log("Tel-U Room Hub Backend Running on Port 4000!");
// setInterval(() => {}, 1000);

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const roomTypeDefs = fs.readFileSync(path.join(__dirname, 'schemas', 'room.graphql'), 'utf8');
const bookingTypeDefs = fs.readFileSync(path.join(__dirname, 'schemas', 'booking.graphql'), 'utf8');

const typeDefs = gql`
  ${roomTypeDefs}
  ${bookingTypeDefs}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return { message: err.message };
  }
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Tel-U Room Hub API siap diakses di: ${url}`);
});