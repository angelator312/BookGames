import type { Book } from "./textStore";
import type { SettingsInterface, User } from "./userStore";

export type loaderBook={
    text: any;
    glava: any;
    text2: any;
    b: Book;
    settings: SettingsInterface;
    user:User;
}