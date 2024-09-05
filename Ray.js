import * as Vec3 from "./Vec3.js";

export class Ray {
  constructor(vectorOrigin, vectorDirection) {
    this.origin = new Vec3.Vec3(
      vectorOrigin.getX(),
      vectorOrigin.getY(),
      vectorOrigin.getZ()
    );
    this.direction = new Vec3.Vec3(
      vectorDirection.getX(),
      vectorDirection.getY(),
      vectorDirection.getZ()
    );
  }

  getOrigin() {
    return this.origin;
  }

  getDirection() {
    return this.direction;
  }

  setOrigin(vectorOrigin) {
    this.origin = vectorOrigin;
  }

  setDirection(vectorDirection) {
    this.direction = vectorDirection;
  }

  pointAt(iPosX) {
    return this.origin.add(this.direction.multiply(iPosX)); //origin + (t * direction)
  }
}
