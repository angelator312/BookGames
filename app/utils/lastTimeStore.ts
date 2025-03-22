import { Collection, MongoClient } from "mongodb";
import { getDefaultLastTime, LastTimeInterface } from "./lastTimes";

export class LastTimeStore {
  FixDatabase() {
    const defaultTime = getDefaultLastTime();
    //@ts-ignore
    replaceNulls(defaultTime, this.collection, {}, []);
  }
  collection!: Collection<LastTimeInterface>;
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
  constructor(protected readonly collectionName: string) {}
  async addTime(user: string, book: string) {
    const v: LastTimeInterface = { ...getDefaultLastTime(), user, book };
    const i = await this.collection.replaceOne({ user, book }, v, {
      upsert: true,
    });
    return i;
  }
  async getTimes(user: string) {
    const arr =await this.collection
      .find({ user }, { sort: { time: -1 } })
      .toArray();
    console.log(arr);

    return arr;
  }
}

let ObUser: { [key: string]: LastTimeStore } = {};

export default async function getLastTimeStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "LastTimes"
) {
  if (!ObUser[collectionName]) {
    ObUser[collectionName] = new LastTimeStore(collectionName);
    await ObUser[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObUser[collectionName];
}
