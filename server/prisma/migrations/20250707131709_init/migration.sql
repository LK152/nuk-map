-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT
);
INSERT INTO "new_Spot" ("description", "id", "image", "lat", "lng", "name") SELECT "description", "id", "image", "lat", "lng", "name" FROM "Spot";
DROP TABLE "Spot";
ALTER TABLE "new_Spot" RENAME TO "Spot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
