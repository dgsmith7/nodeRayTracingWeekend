import fs from "fs-extra";

export async function write(fileName, string) {
  try {
    fs.writeFileSync(fileName, string);
    console.log("File successfully written.");
  } catch (err) {
    console.error(err);
  }
}

export async function read(fileName) {
  let contents;
  try {
    contents = fs.readFileSync(fileName);
    console.log("File successfully read.");
  } catch (err) {
    console.error(err);
  }
}
