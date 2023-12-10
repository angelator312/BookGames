import { Outlet } from "@remix-run/react";
// import { requireUserId } from "~/utils/session.server";

export default function JokesRoute() {
  // requireUserId(new Request("/sandw"));
  return (
    <div>
      <h1 className="home-link">
        <span className="logo">Login</span>
      </h1>
      <main className="login-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
