import type { Collection} from "mongodb";
import { Binary ,MongoClient, ObjectId } from "mongodb";
interface ImageInterface {
  _id?: string;
  name: string;
  user: string;
  data: Binary;
  mimeType:string;
}

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
    mimeType:string,
    data: Uint8Array,
  ): Promise<ImageInterface> {
    const v: ImageInterface = {
      name,
      user,
      mimeType,
      data:new Binary(data),
    };
    const i = await this.collection.insertOne(v);
    v._id = i.insertedId;
    return v;
  }
  async getImage(_id: ObjectId,user:string): Promise<ImageInterface |null> {
      return (await this.collection.findOne({ _id,user }))
  }
}


let ObUser: { [key: string]: FileStore } = {};

export default async function getFileStore(
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

