import { Link } from "@remix-run/react";

export default function Intro() {
  //   const user = useLoaderData<string>();
  return (
    // <div className="text-center bg-intro">
    <div className="text-center">
      <div className="text-center">
        <h1 className="text-slate-500 font-medium logo text-primary p-3">
          Добре дошли в Game books
        </h1>
        <h3 className="text-slate-500 font-medium logo text-dark text-bold p-3">
          Здравей Анонимен!
        </h3>
        <span className="text-slate-500 font-medium logo text-dark text-bold">
          Това е виртуална библиотека с книги игри!
          <br />
          За да я разгледаш, трябва да се регистрираш!
        </span>
        <br />
        <br />
        <h2>
          <Link to="/login">
            <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium">
              Вход{" "}
            </span>
          </Link>
          <Link to="/signup">
            <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium">
              {" "}
              Регистрация{" "}
            </span>
          </Link>
        </h2>
      </div>
    </div>
  );
}
