import type { Book } from "./textStore";
import type { SettingsInterface } from "./User";
import type { User } from "./User";

export type loaderBook={
    text: string;
    glava: string;
    text2: string;
    b: Book;
    settings: SettingsInterface;
    user:User;
}