import fs from "fs";

export const deleteFile = async (fileName: string) => {
  const file = await fs.promises.stat(fileName);

  if (file) await fs.promises.unlink(fileName);
};
