const db = require('../db');

const rootResolver = {
  Query: {
    getAvailableRooms: async () => {
      try {
        const [rows] = await db.query('SELECT * FROM rooms WHERE isAvailable = 1');
        
        return rows.map(room => ({
          ...room,
          facility: room.facility ? room.facility.split(', ') : [],
          isAvailable: !!room.isAvailable
        }));
      } catch (error) {
        throw new Error(`Gagal mengambil data ruangan: ${error.message}`);
      }
    }
  }
};

module.exports = rootResolver;