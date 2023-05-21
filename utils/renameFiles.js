// renameFiles.js
const fs = require("fs");
const path = require("path");

const directory = "out";

const renameEntity = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming: ${oldPath} to ${newPath}`, err);
        reject(err);
      } else {
        console.log(`Renamed: ${oldPath} to ${newPath}`);
        resolve();
      }
    });
  });
};

const replacePathInHtml = async (filePath) => {
  const fileContents = await fs.promises.readFile(filePath, "utf-8");
  const updatedContent = fileContents.replace(/_next/g, "next");
  await fs.promises.writeFile(filePath, updatedContent);
};

const renameFolders = async (dir) => {
  const files = await fs.promises.readdir(dir);

  // Process HTML files and replace occurrences of '_next' with 'next'
  files
    .filter((file) => file.endsWith(".html"))
    .forEach(async (file) => {
      const filePath = path.join(dir, file);
      await replacePathInHtml(filePath);
    });

  const folderRenamePromises = files
    .map((file) => ({ folderPath: path.join(dir, file), fileName: file }))
    .filter(
      ({ folderPath, fileName }) =>
        fs.lstatSync(folderPath).isDirectory() && fileName.startsWith("_")
    )
    .map(({ folderPath, fileName }) =>
      renameEntity(folderPath, path.join(dir, fileName.slice(1)))
    );

  await Promise.all(folderRenamePromises);

  const updatedFiles = await fs.promises.readdir(dir);

  updatedFiles.forEach(async (file) => {
    const oldPath = path.join(dir, file);
    if (fs.lstatSync(oldPath).isDirectory()) {
      await renameFolders(oldPath);
    } else if (file.startsWith("_")) {
      const newPath = path.join(dir, file.slice(1));
      await renameEntity(oldPath, newPath);
    }
  });
};

renameFolders(directory)
  .then(() => {
    console.log("Renaming completed");
  })
  .catch((err) => {
    console.error("Error during renaming", err);
  });
