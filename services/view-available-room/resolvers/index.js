const { rooms } = require('../db');

const rootResolver = {
  Query: {
    getAvailableRooms: () => {
      return rooms.filter(room => room.isAvailable === true);
    }
  }
};

module.exports = rootResolver;