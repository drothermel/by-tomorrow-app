/*
  Warnings:

  - You are about to drop the `PaperMetadataLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaperMetadataLibrary";

-- CreateTable
CREATE TABLE "PaperMetadata" (
    "id" SERIAL NOT NULL,
    "arxivId" TEXT NOT NULL,
    "published" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "absLink" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "primaryCategory" TEXT NOT NULL,
    "comments" TEXT,
    "tags" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaperMetadata_arxivId_key" ON "PaperMetadata"("arxivId");
