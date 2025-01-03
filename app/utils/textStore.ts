import type { Collection, WithId } from "mongodb";
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
export interface BookData {
  clicks: number;
  timeForUser: {
    [key: string]: number;
  };
}
export interface Book {
  _id?: string;
  id?: string;
  isBook: boolean;
  text: string;
  doGl: string;
  tags?: string[];
  comments?: string[][][];
  public: boolean;
  avtor: string;
  text2: string;
  data: BookData;
}

export interface Spec {
  _id?: string;
  id: string;
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
    smallDescription: string,
    gl?: string | number,
    numSmallName = -1
  ): Promise<Book> {
    if (numSmallName == -1) numSmallName = (await this.getSpec()).bookNom;

    if (!gl) gl = "15";

    const v: Book = {
      id: `Book-${book}--1`,
      isBook: true,
      text: `gb${numSmallName}`,
      public: publ,
      avtor,
      doGl: gl.toString(),
      comments: [],
      tags: [],
      text2: smallDescription,
      data: this.prototypeOfBookData(),
    };

    await this.collection.replaceOne({ id: `Book-${book}--1` }, v, {
      upsert: true,
    });

    await this.addSpec(numSmallName + 1);

    return v;
  }
  async deleteBook(book: string, avt: string): Promise<boolean> {
    const b = await this.getBook(book);
    if (avt !== b?.avtor) return false;
    try {
      await this.collection.deleteOne({ id: b.id });
      return true;
    } catch (error) {
      return false;
    }
  }

  async addComment(
    book: string | null,
    gl: string | number,
    avt: string,
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
    const com = [comment, avt];
    let arr: string[][][] = [];
    for (let i = 0; i <= parseInt(st.doGl) - 2; i++) {
      if (i == gl - 1) {
        try {
          //@ts-ignore
          arr.push([...(st?.comments[i] ?? []), com]);
        } catch (error) {
          arr.push([com]);
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
    let arr: string[][][] = [];
    for (let i = 0; i <= parseInt(st.doGl) - 2; i++) {
      if (i == gl - 1) {
        //@ts-ignore
        arr.push([...(st?.comments[i] ?? [])]);
        arr[i][nom][0] = "";
        arr[i][nom][1] = "";
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

  async getComments(book: string, gl: string | number): Promise<string[][]> {
    const bookL = await this.getBook(book);
    if (!bookL || !bookL.isBook || !bookL.comments) {
      return [];
    }
    return bookL.comments[parseInt(gl.toString()) - 1] ?? [];
  }
  async getMyComments(
    book: string,
    gl: string | number,
    avt: string
  ): Promise<string[]> {
    const bookL = await this.getBook(book);
    if (!bookL || !bookL.isBook || !bookL.comments) {
      return [];
    }
    const a = bookL.comments[parseInt(gl.toString()) - 1] ?? [];
    return a.map((e, i) => (e[1] == avt ? e[0] : ""));
  }
  async searchWithQuery(query: string, books: Book[]): Promise<Book[]> {
    function includes(queryOrg: string, str: string): number {
      const query = queryOrg;
      let br = 0;
      const len = str.length;
      if (str.indexOf(query) != -1) br += len - str.indexOf(query);
      if (str.toLowerCase().indexOf(query) != -1)
        br += len - str.toLowerCase().indexOf(query);
      if (str.toLowerCase().indexOf(query.toLowerCase()) != -1)
        br += len - str.toLowerCase().indexOf(query.toLowerCase());
      return br;
    }
    function includesFromArray(queryOrg: string, str: string[]): number {
      let br = 0;
      for (const e of str) {
        br += includes(queryOrg, e);
      }
      return br; // return the number of matches
    }
    
    function sredno(e: { [key: string]: number }): number {
      let sum = 0;
      Object.values(e).map(k => sum +=k);
      return sum/Object.values(e).length;
    }
    function analysticFunc(e: WithId<Book>): number {
      const clickWeight=10;
      const timeWeight = 100;
      let br=e.data.clicks*clickWeight;
      br+=sredno(e.data.timeForUser)*timeWeight;
      
      return br;
    }
    function filterFunc(e: WithId<Book>, query: string): number {
      return (
        includes(query, e.id ?? "") * 2 +
        includesFromArray(query, e.tags ?? [""]) * 3 +
        includes(query, e.text2 ?? "") * 2 +
        includes(query, e.avtor ?? "")
      );
    }
    // @ts-ignore
    const data1 = books.filter((e) => filterFunc(e, query));
    const data2 = data1.sort((a, b) => {
      //@ts-ignore
      const aOtg = filterFunc(a, query),bOtg = filterFunc(b, query);
      if (aOtg > bOtg) return -1;
      if (aOtg == bOtg) {
        //@ts-ignore
        const aOtg = analysticFunc(a),bOtg = analysticFunc(b);
        if (aOtg > bOtg) return -1;
        if (aOtg == bOtg) return 0;
        return 1;
      }
      return 1;
    });
    //console.log(data1);

    // @ts-ignore
    const data1Ost = books.filter((e) => !filterFunc(e, query));
    const out = data2;
    out.push(...data1Ost);
    return out;
  }
  async getPublicBooks(avt: string, query: string | null): Promise<Book[]> {
    //@ts-ignore
    const data: Book[] = await this.collection
      .find({ public: true, isBook: true }, { sort: { time: "ascending" } })
      .toArray();
    if (data.length === 0) {
      return [];
    }
    for (let i = 0; i < data.length; i++)
      if (data[i].avtor == avt) delete data[i];

    if (typeof query === "string" && query.length > 0) {
      //
      //console.log(data);
      return this.searchWithQuery(query, data);
    }

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
      data: this.prototypeOfBookData(),
    };
  }
  //Analyzer
  async getBook2(book: string): Promise<Book | null> {
    //@ts-ignore
    const t: Book | null = await this.collection.findOne({
      text: book,
      isBook: true,
    });
    if (t) {
      this.addClick(t);
      return t;
    }
    return null;
  }
  async addClick(book: Book): Promise<void> {
    const v: Book = {
      ...book,
      data: {
        clicks: (book.data?.clicks ?? 0) + 1,
        timeForUser: book.data?.timeForUser ?? {},
      },
    };

    await this.collection.replaceOne({ id: book.id }, v, {
      upsert: true,
    });
    return;
  }
  async addTime(bookName: string, timeM: number, user: string): Promise<void> {
    if (Number.isNaN(timeM)) return;
    const book = await this.getBook(bookName);
    if (!book) return;
    const v: Book = {
      ...book,
      data: {
        clicks: book.data?.clicks,
        timeForUser: {
          ...(book.data?.timeForUser ?? {}),
        },
      },
    };
    v.data.timeForUser[user] = v.data.timeForUser[user] + timeM;
    await this.collection.replaceOne({ id: book.id }, v, {
      upsert: true,
    });
  }

  prototypeOfBookData(): BookData {
    const d: BookData = {
      clicks: 0,
      timeForUser: {},
    };
    return d;
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
