import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import getTextStore from "./textStore";
import {} from "./User";
import type { VariableItem, VariableCollection } from "./VariableThings";
import { getDefaultVariables } from "./VariableThings";
class VariableStore {
  collection!: Collection<VariableItem>;
  //   bookCollection!: Collection<BookItem>
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
  async getVariables(user: string, bId: string) {
    const result = await this.collection.findOne({ user, book: bId });
    if (result) {
      return result.vars;
    } else {
      const tStore = await getTextStore();
      const book = await tStore.getBook(bId);
      if (book) {
        if (book.defaultVariables) {
          await this.setVariables(user, bId, book.defaultVariables);
          return book.defaultVariables;
        }
      }
      return getDefaultVariables();
    }
  }
  async setVariableItem(user: string, book: string, vs: VariableItem) {
    // const vars=await this.getVariables(user,book);
    return await this.collection.replaceOne({ user, book }, vs, {
      upsert: true,
    });
  }
  async setVariables(user: string, book: string, vs: VariableCollection) {
    return await this.setVariableItem(user, book, {
      book: book,
      user: user,
      vars: vs,
    });
  }
}

let ObTexts: { [key: string]: VariableStore } = {};
export default async function getVariableStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "Variables"
) {
  if (!ObTexts[collectionName]) {
    ObTexts[collectionName] = new VariableStore(collectionName);
    await ObTexts[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObTexts[collectionName];
}
