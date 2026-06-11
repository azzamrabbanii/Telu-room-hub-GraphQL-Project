const { rooms, bookings } = require('../db');

const bookingResolver = {
  Mutation: {
    createBooking: (_, { roomId, studentName, studentId, bookingTime }) => {
        
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex === -1) {
        throw new Error(`Ruangan dengan ID ${roomId} tidak ditemukan!`);
      }

      if (!rooms[roomIndex].isAvailable) {
        throw new Error(`Maaf, ruangan ${rooms[roomIndex].name} sedang digunakan atau sudah dibooking!`);
      }

      const newBooking = {
        id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
        roomId,
        room: rooms[roomIndex],
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
      if (bookingIndex === -1) {
        throw new Error(`Data booking dengan ID ${bookingId} tidak ditemukan!`);
      }

      const roomId = bookings[bookingIndex].roomId;
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex !== -1) {
        rooms[roomIndex].isAvailable = true;
      }

      bookings[bookingIndex].status = "CANCELLED";
      
      return bookings[bookingIndex];
    }
  }
};

module.exports = bookingResolver;