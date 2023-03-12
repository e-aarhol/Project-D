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
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0
);
`)

