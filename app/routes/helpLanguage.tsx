import { Link } from "@remix-run/react";
import { TabLang } from "~/components/TabLang";
export async function action() {
  return "";
}
export default function Intro() {
  //   const user = useLoaderData<string>();

  return (
    // <div className="text-center bg-intro">
    <div className="text-center">
      <br />
      <br />
      <h1 className="text-slate-500 font-medium logo f-book-c p-3 line-height-1">
        Добре дошли в документацията на езика!
      </h1>
      {/* <Drop */}
      <TabLang />
      <br />
      <br />
      <h2>
        <Link to="/">
          <span className="text-slate-500 font-medium logo text-center text-primary">
            Начало
          </span>
        </Link>
      </h2>
    </div>
  );
}
