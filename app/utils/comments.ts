export interface CommentInterface {
  time: number;
  user: string;
  book: string;
  chapter:number;
  _id?:string;
  text:string;
  title:string;
}

export function getDefaultComment(): CommentInterface {
  return {_id:"-1", time: Date.now(), user: "", book: "",chapter:1,text:"",title:"" };
}
