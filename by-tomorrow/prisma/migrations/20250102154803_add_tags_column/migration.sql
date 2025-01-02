-- CreateTable
CREATE TABLE "PaperMetadataLibrary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arxivId" TEXT NOT NULL,
    "published" DATETIME NOT NULL,
    "updated" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "absLink" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "primaryCategory" TEXT NOT NULL,
    "comments" TEXT,
    "tags" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaperMetadataLibrary_arxivId_key" ON "PaperMetadataLibrary"("arxivId");
