import * as utils from "./utils.js";
import * as Vec3 from "./Vec3.js";
import * as Ray from "./Ray.js";

let filename = "image4.ppm";

let intersectSphere = (center, radius, rayIn) => {
  let oc = center.subtract(rayIn.getOrigin());
  let a = Vec3.dot(rayIn.getDirection(), rayIn.getDirection());
  let b = -2.0 * Vec3.dot(rayIn.getDirection(), oc);
  let c = Vec3.dot(oc, oc) - radius * radius;
  let discriminant = b * b - 4.0 * a * c;

  if (discriminant < 0) {
    return -1.0;
  } else {
    return (-b - Math.sqrt(discriminant)) / (2.0 * a);
  }

  //  return discriminant >= 0.0;
};

let rayColor = (rayIn) => {
  let t = intersectSphere(new Vec3.Vec3(0.0, 0.0, -1.0), 0.5, rayIn);

  if (t > 0.0) {
    let N = Vec3.unitVector(
      rayIn.pointAt(t).subtract(new Vec3.Vec3(0.0, 0.0, -1.0))
    );

    return new Vec3.Vec3(N.getX() + 1, N.getY() + 1, N.getZ() + 1).multiply(
      0.5
    );
  }

  let unitDirection = rayIn.getDirection();
  let a = 0.5 * unitDirection.getY() + 1.0;
  let part1 = new Vec3.Vec3(1.0, 1.0, 1.0).multiply(1.0 - a);
  let part2 = new Vec3.Vec3(0.5, 0.7, 1.0).multiply(a);
  return part1.add(part2);
};

let main = async () => {
  // Image
  let aspectRatio = 16.0 / 9.0;
  let imageWidth = 400.0;
  // Calculate the image height, and ensure that it's at least 1.
  let imageHeight = imageWidth / aspectRatio;
  if (imageHeight < 1.0) imageHeight = 1.0;
  // Camera
  let focalLength = 1.0;
  let viewportHeight = 2.0;
  let viewportWidth = viewportHeight * (imageWidth / imageHeight);
  let cameraCenter = new Vec3.Vec3(0.0, 0.0, 0.0);
  // Calculate the vectors across the horizontal and down the vertical viewport edges.
  let viewportU = new Vec3.Vec3(viewportWidth, 0.0, 0.0);
  let viewportV = new Vec3.Vec3(0.0, -1.0 * viewportHeight, 0.0);
  // Calculate the horizontal and vertical delta vectors from pixel to pixel.
  let pixelDeltaU = viewportU.divide(imageWidth);
  let pixelDeltaV = viewportV.divide(imageHeight);
  // Calculate the location of the upper left pixel.
  let viewportUpperLeft = cameraCenter
    .subtract(new Vec3.Vec3(0.0, 0.0, focalLength))
    .subtract(viewportU.divide(2.0))
    .subtract(viewportV.divide(2.0));
  let pixel00Loc = viewportUpperLeft.add(
    pixelDeltaU.add(pixelDeltaV).multiply(0.5)
  );
  // Render
  let imageString = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  let color = new Vec3.Vec3(0.0, 0.0, 0.0);
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
  await utils.write(filename, imageString);
  console.log("Done.");
};

main();
