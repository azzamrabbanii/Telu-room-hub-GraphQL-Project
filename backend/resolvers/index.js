const roomResolver = { Query: {} } = require('./roomResolver');
const bookingResolver = { Mutation: {} } = require('./bookingResolver');

const rootResolver = {
  Query: {
    ...roomResolver.Query
  },
  Mutation: {
    ...bookingResolver.Mutation
  }
};

module.exports = rootResolver;