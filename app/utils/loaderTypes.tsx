import { CommentInterface } from "./comments";
import type { BookInterface } from "./textStore";
import type { SettingsInterface, User, UserData, } from "./User";
import type { VariableInterface } from "./VariableThings";

export type loaderBook={
    text: string;
    glava: string;
    text2: string;
    bookObj: BookInterface;
    settings: SettingsInterface;
    user:User;
    datasOfUsers:UserData[];
    variables:{[key:string]:VariableInterface};
    comments:CommentInterface[];
}