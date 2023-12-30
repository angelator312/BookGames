// import { Outlet } from "@remix-run/react";

import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import getUserStore from "~/utils/mongostore";
import { getUserId } from "~/utils/session.server";
import stylesUrl from "~/styles/login.css";
import { Link } from "@remix-run/react";

// import { db } from "~/utils/db.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const pass = form.get("pass");
  const pass2 = form.get("pass2");
  const username = form.get("user");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof pass !== "string" || typeof username !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  const users = await getUserStore();
  const user = await users.getUser(username);
  if (user || pass != pass2) return redirect("/signup");
  console.log(username, pass);
  users.addUser(username, pass);
  return redirect(`/login`);

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const u = await getUserId(request);
  if (u) return redirect("/");
  return true;
};
export default function JokesRoute() {
  return (
    <div className="text-center">
      <h1 className="text-slate-500 font-medium logo text-primary p-3 home-link">
        <span className="logo">Register</span>
      </h1>
      <main className="text-slate-500 font-medium logo text-dark text-bold p-3 login-main">
        <div className="container">
          <div>
            <form method="post">
              <div>
                <label>
                  Username:{" "}
                  <input
                    className="text-bold inp-bl"
                    minLength={4}
                    type="text"
                    name="user"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Password:{" "}
                  <input
                    className="text-bold inp-bl"
                    minLength={8}
                    name="pass"
                    type="password"
                    required
                  />
                </label>
                <br />
                <label>
                  Password:{" "}
                  <input
                    className="text-bold inp-bl"
                    minLength={8}
                    name="pass2"
                    type="password"
                    required
                  />
                </label>
              </div>
              <div>
                <button type="submit" className="button">
                  Add User
                </button>
              </div>
            </form>
            <br />
            <Link to="/login">
              <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium button">
                Login
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
