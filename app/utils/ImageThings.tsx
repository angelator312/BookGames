import type { Binary } from "mongodb";

export interface ImageInterface {
  _id?: string;
  name: string;
  user: string;
  data: Binary;
  thumbnail: Binary;
  mimeType: string;
}
export interface MiniInterface {
  id: string;
  thumbnail: Binary;
  name: string;
}
