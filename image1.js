import * as utils from "./utils.js";
import * as Vec3 from "./Vec3.js";

let main = async () => {
  // Image
  let imageWidth = 256;
  let imageHeight = 256;
  // Render
  let imageString = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  let color = new Vec3.Vec3(0, 0, 0);

  for (let j = 0; j < imageHeight; j++) {
    console.log(`\rScanlines remaining: ${imageHeight - j} `);
    for (let i = 0; i < imageWidth; i++) {
      color.setR(i / (imageWidth - 1));
      color.setG(j / (imageHeight - 1));
      color.setB(0.0);

      let ir = color.getR();
      let ig = color.getG();
      let ib = color.getB();

      imageString += `${ir} ${ig} ${ib}\n`;
    }
  }
  console.log("Writing file.");
  await utils.write("image1.ppm", imageString);
  console.log("Done.");
};

main();
