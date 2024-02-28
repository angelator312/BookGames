import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
export interface Text {
  _id?: string;
  id?: string;
  isBook: boolean;
  text: string;
  text2?: string;
  tags?: string[];
  public?: boolean;
  avtor?: string;
}
export interface Book {
  _id?: string;
  id?: string;
  isBook: boolean;
  text: string;
  doGl: string;
  tags?: string[];
  comments?: string[][];
  public: boolean;
  avtor: string;
  text2:string;
}
export interface Spec {
  _id?: string;
  id:string
  bookNom: number;
  isBook: boolean;
  text?: any;
  text2?: any;
}

export class BookStore {
  async addBook(
    book: string,
    avtor: string,
    publ = false,
    shD: string,
    gl?: string | number
  ): Promise<Book> {
    const b = (await this.getSpec()).bookNom;

    if (!gl) gl = "15";

    const v: Book = {
      id: `Book-${book}--1`,
      isBook: true,
      text: `gb${b}`,
      public: publ,
      avtor,
      doGl: gl.toString(),
      comments: [],
      tags: [],
      text2: shD,
    };

    await this.collection.replaceOne({ id: `Book-${book}--1` }, v, {
      upsert: true,
    });

    await this.addSpec(b + 1);

    return v;
  }
  async deleteBook(
    book: string,avt:string
  ): Promise<boolean> {
    const b = await this.getBook(book);
    if(avt!==b?.avtor)return false;
    try {
      await this.collection.deleteOne({ id: b.id})
      return true;
      
    } catch (error) {
      return false
    }
  }

  async addComment(
    book: string | null,
    gl: string | number,
    comment: string
  ): Promise<Book | null> {
    if (!(book && gl && comment)) return null;
    if (typeof gl == "string") gl = parseInt(gl);
    if (Number.isNaN(gl)) return null;
    let st = await this.getBook(book);
    if (!st) return null;
    delete st._id;
    // console.log(gl - 1);
    // console.log( );

    // console.log(st);
    let arr: string[][] = [];
    for (let i = 0; i <= parseInt(st.doGl) - 2; i++) {
      if (i == gl - 1) {
        try {
          //@ts-ignore
          arr.push([...(st?.comments[i] ?? []), comment]);
        } catch (error) {
          arr.push([comment]);
        }
      } else {
        try {
          // @ts-ignore
          arr.push(st?.comments[i] ?? []);
        } catch (error) {
          arr.push([]);
        }
      }
    }
    if (!st.comments) st.comments = arr;

    const v: Book = {
      ...st,

      comments: arr,
    };
    await this.collection.replaceOne({ id: st.id }, v, {
      upsert: true,
    });
    return v;
  }
  async deleteComment(
    book: string | null,
    gl: string | number,
    nom: number
  ): Promise<Book | null> {
    if (typeof gl == "string") gl = parseInt(gl);
    // console.log( );
    if (nom < 0 || Number.isNaN(nom)) return null;
    if (!(book && gl)) return null;
    let st = await this.getBook(book);
    if (!st) return null;
    delete st._id;
    // console.log(2);

    // console.log(st);
    let arr: string[][] = [];
    for (let i = 0; i <= parseInt(st.doGl) - 2; i++) {
      if (i == gl - 1) {
        //@ts-ignore
        arr.push([...(st?.comments[i] ?? [])]);
        arr[i][nom] = "";
      }
      // @ts-ignore
      else arr.push(st.comments[i] ?? []);
    }
    if (!st.comments) st.comments = arr;

    // console.dir(arr);

    const v: Book = {
      ...st,

      comments: arr,
    };
    await this.collection.replaceOne({ id: st.id }, v, {
      upsert: true,
    });
    return v;
  }
  async getBook(book: string): Promise<Book | null> {
    const t = await this.collection.findOne({
      text: book,
      isBook: true,
    });
    //@ts-ignore
    return t;
  }
  async getComments(book: string, gl: string | number): Promise<string[]> {
    const bookL = await this.getBook(book);
    if (!bookL || !bookL.isBook || !bookL.comments) {
      return [];
    }
    return bookL.comments[parseInt(gl.toString()) - 1] ?? [];
  }
  async getPublicBooks(avt: string): Promise<Book[]> {
    const data = await this.collection
      .find({ public: true, isBook: true }, { sort: { time: "ascending" } })
      .toArray();
    if (data.length === 0) {
      return [];
    }
    for (let i = 0; i < data.length; i++)
      //@ts-ignore
      if (data[i].avtor == avt) delete data[i];
    // @ts-ignore
    return data;
  }
  async getMyBooks(avt: string): Promise<Book[] | null> {
    const data = await this.collection
      .find({ isBook: true, avtor: avt }, { sort: { time: "ascending" } })
      .toArray();
    if (data.length === 0) {
      return null;
    }
    // @ts-ignore
    return data;
  }
  collection!: Collection<Text | Book | Spec>;
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
  async addText(id: string, text: string, text2: string): Promise<Text> {
    const v: Text = {
      id: id,
      text,
      text2,
      isBook: false,
    };
    await this.collection.replaceOne({ id: id }, v, { upsert: true });

    return v;
  }
  async getText(id: string): Promise<Text | Spec | null> {
    const data = await this.collection.findOne({ id: id });
    if (!data) {
      return null;
    }
    return data;
  }
  async getSpec(): Promise<Spec> {
    const data = await this.collection.findOne({
      id: "Spec--1--cepS",
      isBook: false,
    });
    if (!data) {
      return await this.addSpec(0);
    }
    //@ts-ignore
    return data;
  }
  async addSpec(nom: number): Promise<Spec> {
    const v: Spec = { isBook: false, bookNom: nom, id: "Spec--1--cepS" };
    await this.collection.replaceOne(
      { id: "Spec--1--cepS", isBook: false },
      v,
      {
        upsert: true,
      }
    );

    return v;
  }
  prototypeOfText(): Text {
    return {
      isBook: false,
      text: "",
      text2: "",
      public: false,
      avtor: "",
    };
  }
  prototypeOfBook(): Book {
    return {
      isBook: true,
      text: "",
      doGl: "15",
      public: false,
      avtor: "",
      text2: "",
    };
  }
}
let ObTexts: { [key: string]: BookStore } = {};
export default async function getTextStore(
  url: string | undefined = process.env.MONGO_URL,
  collectionName: string = "Books"
) {
  if (!ObTexts[collectionName]) {
    ObTexts[collectionName] = new BookStore(collectionName);
    await ObTexts[collectionName].conect(
      url ?? "mongodb://book:book@127.0.0.1/Systezanie1-2023-24"
    );
  }
  return ObTexts[collectionName];
}
