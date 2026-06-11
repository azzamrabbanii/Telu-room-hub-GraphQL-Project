const { rooms } = require('../db');

const roomResolver = {
  Query: {
    getAvailableRooms: () => {
      return rooms.filter(room => room.isAvailable === true);
    }
  }
};

module.exports = roomResolver;