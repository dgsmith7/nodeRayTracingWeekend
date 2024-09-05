export class Vec3 {
  constructor(_x, _y, _z) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getZ() {
    return this.z;
  }

  setX(_x) {
    this.x = _x;
  }

  setY(_y) {
    this.y = _y;
  }

  setZ(_z) {
    this.z = _z;
  }

  setR(_r) {
    this.x = _r;
  }

  setG(_g) {
    this.y = _g;
  }

  setB(_b) {
    this.z = _b;
  }

  getR() {
    return Math.abs(Math.round(this.x * 255));
  }

  getG() {
    return Math.abs(Math.round(this.y * 255));
  }

  getB() {
    return Math.abs(Math.round(this.z * 255));
  }

  negate() {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(t) {
    return new Vec3(this.x * t, this.y * t, this.z * t);
  }

  divide(t) {
    return new Vec3(this.x / t, this.y / t, this.z / t);
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }
}

// Vector Utility Functions
export function dot(u, v) {
  return u.x * v.x + u.y * v.y + u.z * v.z;
}

export function cross(u, v) {
  return new Vec3(
    u.y * v.z - u.z * v.y,
    u.z * v.x - u.x * v.z,
    u.x * v.y - u.y * v.x
  );
}

export function unitVector(v) {
  return v.divide(v.length());
}

// Aliasing point3 to vec3
export const Point3 = Vec3;
