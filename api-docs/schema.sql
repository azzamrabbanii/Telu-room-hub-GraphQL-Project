-- ==========================================
-- Database Initialization Script
-- Project: Tel-U Room Hub (Facility Booking System)
-- ==========================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS `telu_room_hub_eai`;
USE `telu_room_hub_eai`;

-- 2. Drop existing tables if they exist to prevent conflicts during re-run
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `rooms`;

-- 3. Create 'rooms' Table
CREATE TABLE `rooms` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL,
  `facility` VARCHAR(255) NOT NULL COMMENT 'Store as comma-separated values (e.g. Projector, AC, Whiteboard)',
  `isAvailable` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create 'bookings' Table
CREATE TABLE `bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roomId` VARCHAR(50) NOT NULL,
  `studentName` VARCHAR(100) NOT NULL,
  `studentId` VARCHAR(50) NOT NULL COMMENT 'Student identification number (NIM)',
  `bookingTime` DATETIME NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED' COMMENT 'CONFIRMED, CANCELLED',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Seed Initial Rooms Data (Telkom University GKU Study Rooms)
INSERT INTO `rooms` (`id`, `name`, `capacity`, `facility`, `isAvailable`) VALUES
('KU3.05.01', 'Integrated Lab Sandbox', 30, 'Projector, Whiteboard, High-Speed Wi-Fi, AC', 1),
('KU3.05.02', 'Discussion Room 2A', 10, 'Whiteboard, High-Speed Wi-Fi, AC', 1),
('KU3.05.03', 'Discussion Room 2B', 12, 'Projector, Whiteboard, High-Speed Wi-Fi, AC', 1),
('KU1.02.15', 'Large Seminar Hall', 100, 'Sound System, Projector, Mic, AC, Whiteboard', 1),
('KU2.04.05', 'Common Study Area', 20, 'High-Speed Wi-Fi, Charging Ports', 1);

-- 6. Seed Sample Booking (Optional demonstration)
INSERT INTO `bookings` (`roomId`, `studentName`, `studentId`, `bookingTime`, `status`) VALUES
('KU3.05.02', 'Azzam Rabbani', '1202220001', '2026-06-25 10:00:00', 'CONFIRMED');

-- Mark booked room as reserved
UPDATE `rooms` SET `isAvailable` = 0 WHERE `id` = 'KU3.05.02';
