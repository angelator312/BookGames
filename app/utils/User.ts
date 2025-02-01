import type { ObjectId } from "mongodb";
import { VariableCollection, VariableInterface } from "./VariableThings";

export interface Turneta {
  _id?: ObjectId;
  time: string; //let now = new Date();
  //let todayString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  duration?: number;
  timeForStop: string; //like time property
}

export interface User {
  _id?: ObjectId;
  glavi?: any;
  user: string;
  passH: string;
  settings?: SettingsInterface;
  data: UserData;
  admin: boolean;
  variables?: { [key: string]: VariableInterface };
}
export interface UserData {
  forMe: string;
  isPro: boolean;
  verifiedAuthor: boolean;
}
export interface SettingsInterface {
  fontSize: number;
  tutorial?: boolean;
}

export function getDefaultSettings(): SettingsInterface {
  const settings: SettingsInterface = {
    fontSize: 10,
    tutorial: true,
  };
  return settings;
}

export function getDefaultUserData(): UserData {
  const settings: UserData = {
    forMe: "",
    verifiedAuthor: false,
    isPro: false,
  };
  return settings;
}
export function getDefaultUser(): User {
  const settings: User = {
    passH: "",
    user: "",
    data: getDefaultUserData(),
    admin: false,
  };
  return settings;
}

export function compileToString(
  text: string,
  variables: VariableCollection
): string {
  let result = text;
  // console.log("start", text);

  for (const i of Object.keys(variables)) {
    result = result?.replace(
      `{${variables[i].name}}`,
      variables[i].value.toString()
    );
  }
  // console.log("end", result);
  return result;
}
