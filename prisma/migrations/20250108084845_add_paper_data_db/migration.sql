-- AlterTable
ALTER TABLE "PaperMetadata" ADD COLUMN     "paperDataViewParams" TEXT;

-- CreateTable
CREATE TABLE "PaperData" (
    "id" SERIAL NOT NULL,
    "arxivId" TEXT NOT NULL,
    "paperText" TEXT NOT NULL,
    "paperDataStr" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaperData_arxivId_key" ON "PaperData"("arxivId");
