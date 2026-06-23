const db = require('../db');

const rootResolver = {
  Mutation: {
    createBooking: async (_, { roomId, studentName, studentId, bookingTime }) => {
      try {
        const [rooms] = await db.query('SELECT * FROM rooms WHERE id = ?', [roomId]);
        if (rooms.length === 0) throw new Error(`Ruangan ${roomId} tidak ditemukan!`);
        if (!rooms[0].isAvailable) throw new Error(`Ruangan sudah dibooking!`);

        const [result] = await db.query(
          'INSERT INTO bookings (roomId, studentName, studentId, bookingTime, status) VALUES (?, ?, ?, ?, "CONFIRMED")',
          [roomId, studentName, studentId, bookingTime]
        );

        await db.query('UPDATE rooms SET isAvailable = 0 WHERE id = ?', [roomId]);

        return {
          id: result.insertId.toString(),
          roomId,
          studentName,
          studentId,
          bookingTime,
          status: "CONFIRMED"
        };
      } catch (error) {
        throw new Error(`Gagal membuat booking: ${error.message}`);
      }
    },
    cancelBooking: async (_, { bookingId }) => {
      try {
        const [bookings] = await db.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
        if (bookings.length === 0) throw new Error(`Booking ID ${bookingId} tidak ditemukan!`);

        const roomId = bookings[0].roomId;
        
        await db.query('UPDATE bookings SET status = "CANCELLED" WHERE id = ?', [bookingId]);
        await db.query('UPDATE rooms SET isAvailable = 1 WHERE id = ?', [roomId]);

        return {
          id: bookings[0].id.toString(),
          roomId,
          studentName: bookings[0].studentName,
          studentId: bookings[0].studentId,
          bookingTime: bookings[0].bookingTime,
          status: "CANCELLED"
        };
      } catch (error) {
        throw new Error(`Gagal membatalkan booking: ${error.message}`);
      }
    }
  }
};

module.exports = rootResolver;