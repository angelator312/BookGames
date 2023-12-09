import { Outlet } from "@remix-run/react";

export default function JokesRoute() {
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
