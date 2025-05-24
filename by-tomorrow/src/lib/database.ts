import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export const db = new PrismaClient();

export async function mergeInsertData(newData: PaperMetadata[]) {
  console.log(newData)
  try {
      await db.$transaction(async (tx) => {
          // Step 1: Separate new and existing entries
          const targetArxivIds = newData.map(data => data.arxivId);
          console.log(targetArxivIds)


          const existingEntries = await tx.paperMetadata.findMany({
              where: { arxivId: { in: targetArxivIds } },
          });

          const existingIdsSet = new Set(existingEntries.map(entry => entry.id));
          const newEntries = newData.filter(data => !existingIdsSet.has(data.id));
          const updateEntries = newData.filter(data => existingIdsSet.has(data.id));

          // Step 2: Bulk insert new entries
          if (newEntries.length > 0) {
              await tx.paperMetadata.createMany({
                  data: newEntries,
              });
          }

          // Step 3: Serially update existing entries
          for (const data of updateEntries) {
              const { id, ...updateData } = data;
              await tx.paperMetadata.update({
                  where: { id },
                  data: updateData,
              });
          }
      });
      return { success: true };
  } catch (error) {
    return { success: false, error};
  }
}
