-- AlterTable
ALTER TABLE "PaperMetadata" ADD COLUMN     "linkedClaims" INTEGER[],
ADD COLUMN     "linkedDocuments" INTEGER[],
ADD COLUMN     "linkedQuestions" INTEGER[],
ADD COLUMN     "linkedSnippets" INTEGER[],
ADD COLUMN     "linkedTopics" INTEGER[],
ADD COLUMN     "roamPage" TEXT;

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claims" (
    "id" SERIAL NOT NULL,
    "claim" TEXT NOT NULL,
    "claimHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "topicHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "documentText" TEXT NOT NULL,
    "documentTextHistory" TEXT[],
    "documentContents" INTEGER[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedSnippets" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snippets" (
    "id" SERIAL NOT NULL,
    "snippet" TEXT NOT NULL,
    "snippetHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedDocuments" INTEGER[],
    "includedInDocuments" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Snippets_pkey" PRIMARY KEY ("id")
);
