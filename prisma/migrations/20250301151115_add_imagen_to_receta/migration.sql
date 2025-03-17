/*
  Warnings:

  - Added the required column `imagen` to the `Receta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ingredientes" TEXT NOT NULL,
    "pasos" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    CONSTRAINT "Receta_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Receta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receta" ("categoriaId", "descripcion", "id", "ingredientes", "nombre", "pasos", "usuarioId") SELECT "categoriaId", "descripcion", "id", "ingredientes", "nombre", "pasos", "usuarioId" FROM "Receta";
DROP TABLE "Receta";
ALTER TABLE "new_Receta" RENAME TO "Receta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
