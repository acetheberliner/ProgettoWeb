DROP DATABASE IF EXISTS notesync;

CREATE DATABASE notesync;

USE notesync;

CREATE TABLE `note` (
  `idnote` int(11) NOT NULL,
  `titolo` varchar(50) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `data` varchar(20) NOT NULL,
  `autore` varchar(20) NOT NULL,
  `testo` varchar(2500) NOT NULL,
  `stato` enum('da approvare','approvata','rifiutata') NOT NULL DEFAULT 'da approvare',
  `commento` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`idnote`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `utenti` (
username varchar(20) NOT NULL,
password varchar(65) NOT NULL,
role ENUM("mod", "user") default "user",
PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- `email` varchar(20) NOT NULL,