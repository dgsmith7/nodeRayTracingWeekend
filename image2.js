import * as utils from "./utils.js";
import * as Vec3 from "./Vec3.js";
import * as Ray from "./Ray.js";

let rayColor = (rayIn) => {
  let unitDirection = rayIn.getDirection();
  let a = 0.5 * unitDirection.getY() + 1.0;
  let part1 = new Vec3.Vec3(1.0, 1.0, 1.0).multiply(1.0 - a);
  let part2 = new Vec3.Vec3(0.5, 0.7, 1.0).multiply(a);
  return part1.add(part2);
};

let main = async () => {
  // Image
  let aspectRatio = 16 / 9;
  let imageWidth = 400;
  // Calculate the image height, and ensure that it's at least 1.
  let imageHeight = Math.floor(imageWidth / aspectRatio);
  imageHeight = imageHeight < 1 ? 1 : imageHeight;
  // Camera
  let focalLength = 1.0;
  let viewportHeight = 2.0;
  let viewportWidth = viewportHeight * (imageWidth / imageHeight);
  let cameraCenter = new Vec3.Vec3(0, 0, 0);
  // Calculate the vectors across the horizontal and down the vertical viewport edges.
  let viewportU = new Vec3.Vec3(viewportWidth, 0, 0);
  let viewportV = new Vec3.Vec3(0, -viewportHeight, 0);
  // Calculate the horizontal and vertical delta vectors from pixel to pixel.
  let pixelDeltaU = viewportU.divide(imageWidth);
  let pixelDeltaV = viewportV.divide(imageHeight);
  // Calculate the location of the upper left pixel.
  let viewportUpperLeft = cameraCenter.subtract(
    new Vec3.Vec3(0, 0, focalLength).subtract(
      viewportU.divide(2).subtract(viewportV.divide(2))
    )
  );
  let pixel00Loc = viewportUpperLeft.add(
    pixelDeltaU.add(pixelDeltaV).divide(2)
  );
  // Render
  let imageString = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  let color = new Vec3.Vec3(0, 0, 0);
  for (let j = 0; j < imageHeight; j++) {
    console.log(`\rScanlines remaining: ${imageHeight - j} `);
    for (let i = 0; i < imageWidth; i++) {
      let pixelCenter = pixel00Loc.add(
        pixelDeltaU.multiply(i).add(pixelDeltaV.multiply(j))
      );
      let rayDirection = pixelCenter.subtract(cameraCenter);
      let r = new Ray.Ray(cameraCenter, rayDirection);

      color = rayColor(r);
      let ir = color.getR();
      let ig = color.getG();
      let ib = color.getB();
      imageString += `${ir} ${ig} ${ib}\n`;
    }
  }
  console.log("Writing file.");
  await utils.write("image2.ppm", imageString);
  console.log("Done.");
};

main();
