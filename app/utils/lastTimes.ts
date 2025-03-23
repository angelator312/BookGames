export interface LastTimeInterface {
  time: number;
  user: string;
  book: string;
  chapter:number;
  _id?:string;
}

export function getDefaultLastTime(): LastTimeInterface {
  return { time: Date.now(), user: "", book: "",chapter:1 };
}
