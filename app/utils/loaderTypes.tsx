import type { Book } from "./textStore";
import type { SettingsInterface, User } from "./userStore";

export type loaderBook={
    text: string;
    glava: string;
    text2: string;
    b: Book;
    settings: SettingsInterface;
    user:string;
}