import type { Collection, ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
export interface SettingsInterface {
  fontSize?: number;
  language?: string;
}
export interface UserData {
  fontSize?: number;
  language?: string;
}
export interface User {
  _id?: ObjectId;
  glavi?: any;
  user: string;
  passH: string;
  settings?: SettingsInterface;
  data?: UserData;
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
      glavi: {},
    };
    const i = await this.collection.replaceOne({ user: user }, v, {
      upsert: true,
    });
    v._id = i.upsertedId;
    return v;
  }
  async editUserSGlava(
    user: string,
    id: string,
    glava: string
  ): Promise<User | null> {
    const data = await this.getUser(user);
    if (!data) return null;

    let v: User = {
      user,
      passH: data.passH,
      glavi: data.glavi,
    };
    v.glavi[id] = glava;
    const i = await this.collection.replaceOne({ user }, v);
    v._id = i.upsertedId;
    return v;
  }
  async getUser(user: string): Promise<User | null> {
    const data = await this.collection.findOne({ user: user }).catch(() => {
      return null;
    });
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
  //Settings
  getDefaultSettings(): SettingsInterface {
    const settings: SettingsInterface = {
      fontSize: 10,
      language: "Bulgarian",
    };
    return settings;
  }
  async getMySettings(user: string): Promise<SettingsInterface> {
    const data = await this.collection.findOne({ user: user });
    if (data) {
      if (data.settings) 
      {
        return data.settings;
      }
    }
    return this.getDefaultSettings();
  }
  async adjustSettings(
    settings: SettingsInterface,
    user: string
  ): Promise<SettingsInterface> {
    const data = await this.getUser(user);
    if (!data) return settings;

    let v: User = {
      ...data,
      settings
    };
    await this.collection.replaceOne({ user }, v);
    return settings;
  }

  //User data
  getDefaultUserData(): UserData {
    const settings: UserData = {};
    return settings;
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
