let rooms = [
  { id: "KU3.02.01", name: "Kelas KU3.02.01", capacity: 40, facility: ["Proyektor", "AC", "Whiteboard"], isAvailable: true },
  { id: "FIT.01.05", name: "Laboratorium Multimedia FIT", capacity: 30, facility: ["PC High-End", "AC", "Drawing Tablet"], isAvailable: true },
  { id: "KU1.01.02", name: "Auditorium GKU", capacity: 150, facility: ["Sound System", "Panggung", "AC central"], isAvailable: false }
];

let bookings = [];

module.exports = { rooms, bookings };