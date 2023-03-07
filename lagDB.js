const db =require("better-sqlite3")("")
db.exec(`
-- Creator:       MySQL Workbench 8.0.27/ExportSQLite Plugin 0.1.0
-- Author:        Aaron c Holgersen
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-02-10 07:59
-- Created:       2023-02-09 12:20
PRAGMA foreign_keys = OFF;

-- Schema: mydb
ATTACH "dbstats.db" AS "dbstats";
BEGIN;
CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brukernavn TEXT UNIQUE NOT NULL,
  passord TEXT NOT NULL
);

CREATE TABLE Game (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bruker_id INTEGER NOT NULL,
  resultat TEXT NOT NULL,
  dato TEXT NOT NULL,
  FOREIGN KEY (bruker_id) REFERENCES Brukere(id)
);

CREATE TABLE Stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bruker_id INTEGER NOT NULL,
  seire INTEGER NOT NULL,
  tap INTEGER NOT NULL,
  FOREIGN KEY (bruker_id) REFERENCES Brukere(id)
);
`)

