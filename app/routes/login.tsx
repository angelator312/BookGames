// import { Outlet } from "@remix-run/react";
// import bcrypt from "bcryptjs";
import { createUserSession } from "~/utils/session.server";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
// import  { User } from "~/utils/mongostore";
import getUserStore from "~/utils/mongostore";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSearchParams } from "@remix-run/react";

import stylesUrl from "~/styles/login.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
// import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const pass = form.get("pass");
  const username = form.get("user");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof pass !== "string" || typeof username !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  const users = await getUserStore();
  const userCheck = await users.checkUser(username, pass);
  if (!userCheck) {
    return redirect(`/login`);
  }
  // type UserWId=Omit(User,"_id",);

  const url = request.url;
  const searchParams = new URLSearchParams(url);

  return createUserSession(
    userCheck.user,
    searchParams.get("redirectTo") ?? "/"
  );

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
};

export default function LoginRoute() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  return (
    <div>
      <h1 className="home-link">
        <span className="logo">Login</span>
      </h1>
      <main className="login-main">
        <div className="container">
          <div>
            <p>Login</p>
            <form method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") || "/sandw"}
              />

              <div>
                <label htmlFor="username-input">Username</label>
                <input type="text" id="username-input" name="user" />
              </div>

              <div>
                <label htmlFor="password-input">Password</label>
                <input id="password-input" name="pass" type="password" />
              </div>

              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
