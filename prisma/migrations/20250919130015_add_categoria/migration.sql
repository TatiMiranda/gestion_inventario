/*
  Warnings:

  - You are about to drop the column `id_sede` on the `equipo` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `equipo` DROP FOREIGN KEY `Equipo_id_sede_fkey`;

-- DropIndex
DROP INDEX `Equipo_id_sede_fkey` ON `equipo`;

-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `equipo` DROP COLUMN `id_sede`,
    ADD COLUMN `sedeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
