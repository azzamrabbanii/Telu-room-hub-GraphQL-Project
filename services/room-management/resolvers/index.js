const { rooms } = require('../db');

const rootResolver = {
  Query: {
    getAllRooms: () => rooms // Melihat semua ruangan tanpa filter status
  },
  Mutation: {
    addRoom: (_, { id, name, capacity, facility }) => {
      const roomExists = rooms.some(r => r.id === id);
      if (roomExists) {
        throw new Error(`Ruangan dengan ID ${id} sudah ada!`);
      }

      const newRoom = { id, name, capacity, facility, isAvailable: true };
      rooms.push(newRoom);
      return newRoom;
    },
    deleteRoom: (_, { id }) => {
      const roomIndex = rooms.findIndex(r => r.id === id);
      if (roomIndex === -1) {
        throw new Error(`Ruangan dengan ID ${id} tidak ditemukan!`);
      }
      rooms.splice(roomIndex, 1);
      return `Ruangan dengan ID ${id} berhasil dihapus.`;
    }
  }
};

module.exports = rootResolver;