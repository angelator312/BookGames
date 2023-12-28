import { Link } from "@remix-run/react";

export default function Home({ user }: { user: string }) {
  //   const user = useLoaderData<string>();
  return (
    <div>
      <h1 style={{ padding: 15.4 }}>Welcome to e-books</h1>
      <h3>Hello {user}</h3>
      <Link to="/e-book1">Голямото приключение</Link>
      <br />
      <Link to="/logout">
        <span className="logo">Log out</span>
      </Link>
    </div>
  );
}
