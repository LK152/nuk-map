/*
  Warnings:

  - The primary key for the `Classroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Spot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Classroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    CONSTRAINT "Classroom_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Classroom" ("id", "name", "spotId") SELECT "id", "name", "spotId" FROM "Classroom";
DROP TABLE "Classroom";
ALTER TABLE "new_Classroom" RENAME TO "Classroom";
CREATE UNIQUE INDEX "Classroom_id_key" ON "Classroom"("id");
CREATE INDEX "Classroom_name_idx" ON "Classroom"("name");
CREATE TABLE "new_Spot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT
);
INSERT INTO "new_Spot" ("description", "id", "image", "lat", "lng", "name") SELECT "description", "id", "image", "lat", "lng", "name" FROM "Spot";
DROP TABLE "Spot";
ALTER TABLE "new_Spot" RENAME TO "Spot";
CREATE UNIQUE INDEX "Spot_id_key" ON "Spot"("id");
CREATE UNIQUE INDEX "Spot_name_key" ON "Spot"("name");
CREATE INDEX "Spot_name_idx" ON "Spot"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
