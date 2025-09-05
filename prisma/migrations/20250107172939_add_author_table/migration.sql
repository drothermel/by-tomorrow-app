/*
  Warnings:

  - You are about to drop the `Claims` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Snippets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Claims";

-- DropTable
DROP TABLE "Documents";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "Snippets";

-- DropTable
DROP TABLE "Topics";

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "includedInDocuments" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "claim" TEXT NOT NULL,
    "claimHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedTopics" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "includedInDocuments" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "topicHistory" TEXT[],
    "tags" TEXT,
    "linkedPapers" INTEGER[],
    "linkedQuestions" INTEGER[],
    "linkedClaims" INTEGER[],
    "linkedDocuments" INTEGER[],
    "linkedSnippets" INTEGER[],
    "includedInDocuments" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
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
    "includedInDocuments" INTEGER[],
    "roamPage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snippet" (
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

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "institutions" TEXT[],
    "papers" INTEGER[],
    "claims" INTEGER[],
    "topics" INTEGER[],
    "documents" INTEGER[],
    "referencedInDocuments" INTEGER[],
    "notes" TEXT[],

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);
