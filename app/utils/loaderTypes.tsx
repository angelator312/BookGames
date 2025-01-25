import type { Book } from "./textStore";
import type { SettingsInterface, User, VariableInterface } from "./User";

export type loaderBook={
    text: string;
    glava: string;
    text2: string;
    b: Book;
    settings: SettingsInterface;
    user:User;
    variables:{[key:string]:VariableInterface};
}