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
    ApolloServerPluginLandingPageGraphQLPlayground({
      tabs: [
        {
          endpoint: 'http://localhost:4002/',
          name: '2. Create Booking',
          query: `mutation CreateBooking($roomId: ID!, $studentName: String!, $studentId: String!, $bookingTime: String!) {
  createBooking(
    roomId: $roomId
    studentName: $studentName
    studentId: $studentId
    bookingTime: $bookingTime
  ) {
    id
    roomId
    studentName
    studentId
    bookingTime
    status
  }
}`,
          variables: `{
  "roomId": "KU3.05.01",
  "studentName": "Azzam Rabbani",
  "studentId": "1202220001",
  "bookingTime": "2026-06-25 10:00:00"
}`
        },
        {
          endpoint: 'http://localhost:4002/',
          name: '3. Cancel Booking',
          query: `mutation CancelBooking($bookingId: ID!) {
  cancelBooking(bookingId: $bookingId) {
    id
    roomId
    studentName
    status
  }
}`,
          variables: `{
  "bookingId": "1"
}`
        }
      ]
    })
  ]
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Service Booking Room siap di: ${url}`);
});