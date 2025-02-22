import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { BookInterface } from "./textStore";
import getTextStore from "./textStore";
import getUserStore from "./userStore";
import { getDefaultUserData } from "./User";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

//is log in:
function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function requireUserId(
  request: Request,
  t = true,
  redirectTo: string = new URL(request.url).pathname
): Promise<string | null> {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    // const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return null;
  }
  return userId;
}

//log in
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

//log out
export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createGorB(key: string, value: string, request: Request) {
  const session = await storage.getSession();
  session.set(key, value);
  return redirect(request.url, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getGorB(key: string) {
  const session = await storage.getSession();
  let e = session.get(key);
  // console.log(e);
  // if (typeof e !=="string") {
  //   e=e.toString();
  // }
  return e;
}
export async function knigi(user: string, query: string | null) {
  const tStore = await getTextStore();
  const a = await tStore.getPublicBooks(user, query);
  const b = await tStore.getMyBooks(user);
  if (b) return [b, a];
  return [[], a];
}
export async function loadSettings(user: string) {
  const tStore = await getUserStore();
  const a = await tStore.getMySettings(user);
  return a;
}

export async function getUserDatas(books: BookInterface[]) {
  const uStore = await getUserStore();
  return books.map(async (book) => {
    return (await uStore.getUser(book.avtor))?.data ?? getDefaultUserData();
  });
}
