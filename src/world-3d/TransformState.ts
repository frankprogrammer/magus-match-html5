export interface Vec3Data {
  x: number;
  y: number;
  z: number;
}

export interface QuatData {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface TransformState {
  position: Vec3Data;
  rotation: QuatData;
  scale: Vec3Data;
}
