const { rooms, bookings } = require('../db');

const rootResolver = {
  Mutation: {
    createBooking: (_, { roomId, studentName, studentId, bookingTime }) => {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex === -1) throw new Error(`Ruangan ${roomId} tidak ditemukan!`);
      if (!rooms[roomIndex].isAvailable) throw new Error(`Ruangan sudah dibooking!`);

      const newBooking = {
        id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
        roomId,
        studentName,
        studentId,
        bookingTime,
        status: "CONFIRMED"
      };
      rooms[roomIndex].isAvailable = false;
      bookings.push(newBooking);
      return newBooking;
    },
    cancelBooking: (_, { bookingId }) => {
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      if (bookingIndex === -1) throw new Error(`Booking ID tidak ditemukan!`);
      const roomId = bookings[bookingIndex].roomId;
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex !== -1) rooms[roomIndex].isAvailable = true;
      bookings[bookingIndex].status = "CANCELLED";
      return bookings[bookingIndex];
    }
  }
};

module.exports = rootResolver;