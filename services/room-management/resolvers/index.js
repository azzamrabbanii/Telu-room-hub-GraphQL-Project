const db = require('../db');

const rootResolver = {
  Query: {
    getAllRooms: async () => {
      const [rows] = await db.query('SELECT * FROM rooms');
      return rows.map(room => ({
        ...room,
        facility: room.facility ? room.facility.split(', ') : [],
        isAvailable: !!room.isAvailable
      }));
    }
  },
  Mutation: {
    addRoom: async (_, { id, name, capacity, facility }) => {
      try {
        const facilityString = facility.join(', ');
        await db.query(
          'INSERT INTO rooms (id, name, capacity, facility, isAvailable) VALUES (?, ?, ?, ?, 1)',
          [id, name, capacity, facilityString]
        );
        return { id, name, capacity, facility, isAvailable: true };
      } catch (error) {
        throw new Error(`Gagal menambah ruangan: ${error.message}`);
      }
    },
    deleteRoom: async (_, { id }) => {
      try {
        const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [id]);
        if (result.affectedRows === 0) throw new Error(`Ruangan dengan ID ${id} tidak ditemukan!`);
        return `Ruangan dengan ID ${id} berhasil dihapus.`;
      } catch (error) {
        throw new Error(`Gagal menghapus ruangan: ${error.message}`);
      }
    }
  }
};

module.exports = rootResolver;