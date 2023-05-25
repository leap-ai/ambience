const fs = require("fs-extra");
const path = require("path");

const sourceDirectory = "out";
const destinationDirectory = "extension";

const clearDestinationFolder = async (destination) => {
  await fs.emptyDir(destination);
};

const copyAllFilesAndFolders = async (source, destination) => {
  await fs.copy(source, destination);
};

const renameEntity = async (oldPath, newPath) => {
  await fs.rename(oldPath, newPath);
  console.log(`Renamed: ${oldPath} to ${newPath}`);
};

const replacePathInHtml = async (filePath) => {
  const fileContents = await fs.readFile(filePath, "utf-8");
  const updatedContent = fileContents
    .replace(/_next/g, "next")
    .replace(/_app/g, "app")
    .replace(/_ssg/g, "ssg")
    .replace(/_build/g, "build")
    .replace(/_error/g, "error");
  await fs.writeFile(filePath, updatedContent);
};

const renameFolders = async (dir) => {
  const files = await fs.readdir(dir);

  // Process HTML files and replace occurrences of '_next' with 'next'
  files
    .filter((file) => file.endsWith(".html"))
    .forEach(async (file) => {
      const filePath = path.join(dir, file);
      await replacePathInHtml(filePath);
    });
  files
    .filter((file) => file.endsWith(".js"))
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

  const updatedFiles = await fs.readdir(dir);

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

const run = async () => {
  await clearDestinationFolder(destinationDirectory);
  await copyAllFilesAndFolders(sourceDirectory, destinationDirectory);
  await renameFolders(destinationDirectory)
    .then(() => {
      console.log("Renaming completed");
    })
    .catch((err) => {
      console.error("Error during renaming", err);
    });
};

run();
