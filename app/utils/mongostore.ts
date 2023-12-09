import type { Collection, ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
export interface User {
  _id?: ObjectId;
  user: string;
  passH: string;
}

export class UserStore {
  collection!: Collection<User>;
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly collectionName: string) {}
  protected hash(s: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(s, salt);
    return hash;
  }
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
  async addUser(user: string, pass: string): Promise<User> {
    const passH = this.hash(pass);
    const v: User = {
      user,
      passH,
    };
    const i = await this.collection.insertOne(v);
    v._id = i.insertedId;
    return v;
  }
  async getUser(user: string): Promise<User | null> {
    const data = await this.collection.findOne({ user: user });
    if (!data) {
      return null;
    }
    return data;
  }
  async checkUser(user: string, pass: string): Promise<User | null> {
    const data = await this.getUser(user);
    if (data) {
      if (await bcrypt.compare(pass, data.passH)) return data;
    }
    return null;
  }
}
let ObUser: { [key: string]: UserStore } = {};

export default async function getUserStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "Register"
) {
  if (!ObUser[collectionName]) {
    ObUser[collectionName] = new UserStore(collectionName);
    await ObUser[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObUser[collectionName];
}
