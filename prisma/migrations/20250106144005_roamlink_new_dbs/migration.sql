-- AlterTable
ALTER TABLE "Claims" ADD COLUMN     "includedInDocuments" INTEGER[];

-- AlterTable
ALTER TABLE "Documents" ADD COLUMN     "includedInDocuments" INTEGER[];

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "includedInDocuments" INTEGER[];

-- AlterTable
ALTER TABLE "Topics" ADD COLUMN     "includedInDocuments" INTEGER[];
