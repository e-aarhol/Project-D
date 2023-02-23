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
ATTACH "mydb.db" AS "mydb";
BEGIN;
CREATE TABLE "mydb"."user"(
  "iduser" INTEGER PRIMARY KEY NOT NULL,
  "username" VARCHAR(45) NOT NULL,
  "password" VARCHAR(45) NOT NULL
);
CREATE TABLE "mydb"."products"(
  "idproducts" INTEGER PRIMARY KEY NOT NULL,
  "productName" VARCHAR(45),
  "description" VARCHAR(45),
  "priceNOK" INTEGER
);
CREATE TABLE "mydb"."shoppinCart"(
  "user_iduser" INTEGER NOT NULL,
  "products_idproducts" INTEGER NOT NULL,
  PRIMARY KEY("user_iduser","products_idproducts"),
  CONSTRAINT "fk_user_has_products_user"
    FOREIGN KEY("user_iduser")
    REFERENCES "user"("iduser"),
  CONSTRAINT "fk_user_has_products_products1"
    FOREIGN KEY("products_idproducts")
    REFERENCES "products"("idproducts")
);
CREATE INDEX "mydb"."shoppinCart.fk_user_has_products_products1_idx" ON "shoppinCart" ("products_idproducts");
CREATE INDEX "mydb"."shoppinCart.fk_user_has_products_user_idx" ON "shoppinCart" ("user_iduser");
CREATE TABLE "mydb"."purchaseHistoryxx"(
  "user_iduser" INTEGER NOT NULL,
  "products_idproducts" INTEGER NOT NULL,
  PRIMARY KEY("user_iduser","products_idproducts"),
  CONSTRAINT "fk_user_has_products_user1"
    FOREIGN KEY("user_iduser")
    REFERENCES "user"("iduser"),
  CONSTRAINT "fk_user_has_products_products2"
    FOREIGN KEY("products_idproducts")
    REFERENCES "products"("idproducts")
);
CREATE INDEX "mydb"."purchaseHistoryxx.fk_user_has_products_products2_idx" ON "purchaseHistoryxx" ("products_idproducts");
CREATE INDEX "mydb"."purchaseHistoryxx.fk_user_has_products_user1_idx" ON "purchaseHistoryxx" ("user_iduser");
COMMIT;
`)