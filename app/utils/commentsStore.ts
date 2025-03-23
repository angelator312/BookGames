import { Collection, MongoClient, ObjectId } from "mongodb";
import { replaceNulls } from "./MongoUtils";
import { CommentInterface, getDefaultComment } from "./comments";

export class CommentsStore {
  FixDatabase() {
    const defaultTime = getDefaultComment();
    //@ts-ignore
    replaceNulls(defaultTime, this.collection, {}, []);
  }
  collection!: Collection<CommentInterface>;
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
  async getComments(chapter: number, book: string) {
    return this.collection.find({ chapter, book }, { sort: { time: -1 } });
  }
  async addComment(
    user: string,
    book: string,
    chapter: number,
    title: string,
    text: string
  ) {
    const v = { ...getDefaultComment(), user, book, chapter, title, text };
    delete v._id;
    this.collection.insertOne(v);
  }
}

let ObUser: { [key: string]: CommentsStore } = {};

export default async function getLastTimeStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "LastTimes"
) {
  if (!ObUser[collectionName]) {
    ObUser[collectionName] = new CommentsStore(collectionName);
    await ObUser[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObUser[collectionName];
}
