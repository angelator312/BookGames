import type { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  glavi?: any;
  user: string;
  passH: string;
  settings?: SettingsInterface;
  data?: UserData;
  admin?: boolean;
}export interface UserData {
  forMe: string;
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
  };
  return settings;
}
export function getDefaultUser(): User {
  const settings: User = {
    passH: "",
    user: "",
  };
  return settings;
}