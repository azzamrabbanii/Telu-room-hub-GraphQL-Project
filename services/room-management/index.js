const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, 'schemas', 'management.graphql'), 'utf8')}
`;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      tabs: [
        {
          endpoint: 'http://localhost:4003/',
          name: '1. Get All Rooms (Admin)',
          query: `query GetAllRooms {
  getAllRooms {
    id
    name
    capacity
    facility
    isAvailable
  }
}`
        },
        {
          endpoint: 'http://localhost:4003/',
          name: '2. Add Room (Admin)',
          query: `mutation AddRoom($id: ID!, $name: String!, $capacity: Int!, $facility: [String!]!) {
  addRoom(
    id: $id
    name: $name
    capacity: $capacity
    facility: $facility
  ) {
    id
    name
    capacity
    facility
    isAvailable
  }
}`,
          variables: `{
  "id": "KU3.05.03",
  "name": "Discussion Room 2B",
  "capacity": 12,
  "facility": ["Projector", "Whiteboard", "High-Speed Wi-Fi", "AC"]
}`
        },
        {
          endpoint: 'http://localhost:4003/',
          name: '3. Delete Room (Admin)',
          query: `mutation DeleteRoom($id: ID!) {
  deleteRoom(id: $id)
}`,
          variables: `{
  "id": "KU3.05.03"
}`
        }
      ]
    })
  ]
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Service Room Management siap di: ${url}`);
});