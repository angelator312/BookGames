import type { BookInterface } from "./textStore";
import type { SettingsInterface, User, } from "./User";
import type { VariableInterface } from "./VariableThings";

export type loaderBook={
    text: string;
    glava: string;
    text2: string;
    b: BookInterface;
    settings: SettingsInterface;
    user:User;
    variables:{[key:string]:VariableInterface};
}