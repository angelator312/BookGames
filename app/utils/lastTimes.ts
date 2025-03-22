export interface LastTimeInterface {
  time: number;
  user: string;
  book: string;
  chapter:number;
  _id:string;
}

export function getDefaultLastTime(): LastTimeInterface {
  return {_id:"-1", time: Date.now(), user: "", book: "",chapter:1 };
}
