import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string" || typeof name !== "string") {
    throw new Error("Form not submitted correctly.");
  }
  console.log(name, content);

  //const fields = { content, name };

  //const joke = await db.joke.create({ data: fields });
  return redirect(`/login`);
};

export default function Login() {
  return (
    <div>
      <p>Login</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Password: <input name="content" type="password" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
