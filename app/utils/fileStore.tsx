import type { Collection } from "mongodb";
import { Binary, MongoClient, ObjectId } from "mongodb";
import sharp from "sharp";
import { ImageInterface, MiniInterface } from "./ImageThings";
class FileStore {
  collection!: Collection<ImageInterface>;
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly collectionName: string) {}
  async conect(urlforconnect: string) {
    const client = new MongoClient(urlforconnect);
    // Свързваме се със Mongo Сървъра
    await client.connect();

    // Взимаме си базата с която ще работим
    const database = client.db();
    // Взимаме си колекцията с която ще работим
    this.collection = database.collection(this.collectionName);
    // console.log(this.collectionName, this.collection);
  }
  async addImage(
    name: string,
    user: string,
    mimeType: string,
    data: Uint8Array
  ): Promise<any> {
    const thumbnail = await sharp(data)
      .resize(128, 128, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({})
      .toBuffer();
    const v: ImageInterface = {
      name,
      user,
      mimeType,
      data: new Binary(data),
      thumbnail: new Binary(thumbnail),
    };
    const i = await this.collection.insertOne(v);
    v._id = i.insertedId;
    return { id: v._id };
  }
  async getImage(_id: ObjectId): Promise<ImageInterface | null> {
    //@ts-ignore
    return await this.collection.findOne({ _id });
  }
  async listImagesForUser(user: string): Promise<MiniInterface[]> {
    const arr = await this.collection.find({ user }).toArray();
    return arr.map((e) => {
      return { thumbnail: e.thumbnail, id: e._id, name: e.name };
    });
  }
  async listImages(): Promise<MiniInterface[]> {
    const arr = await this.collection.find().toArray();
    return arr.map((e) => {
      return { thumbnail: e.thumbnail, id: e._id, name: e.name };
    });
  }
  async deleteImage(_id: string, user: string): Promise<boolean> {
    const img = await this.getImage(new ObjectId(_id));

    if (img) {
      if (img.user === user) {
        return (await this.collection.deleteOne(img)).deletedCount == 1;
      }
    }
    return false;
  }
}

let ObUser: { [key: string]: FileStore } = {};

export default async function getImageStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "Images"
) {
  if (!ObUser[collectionName]) {
    ObUser[collectionName] = new FileStore(collectionName);
    await ObUser[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObUser[collectionName];
}
