export interface LastTimeInterface {
  time: number;
  user: string;
  book: string;
}

export function getDefaultLastTime(): LastTimeInterface {
  return { time: Date.now(), user: "", book: "" };
}
