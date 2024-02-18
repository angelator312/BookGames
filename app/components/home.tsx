import { Link, useSearchParams } from "@remix-run/react";
import type { Text } from "~/utils/textStore";
// import { HydrationProvider, Server } from "react-hydration-provider";
import BookHeader from "./bookHeader";
import NavYesOrNo from "./navbarYes";

export default function Home({ user, books }: { user: string; books: Text[] }) {
  // const userId = useLoaderData<string>();
  const [searchParams,setSearchParams] = useSearchParams();
  let err = searchParams.get("err");
  const errCode = searchParams.get("errCode");
  if (!err)
    switch (errCode) {
      case "1":
      err = `Книгата не е завършена!!!`;  
      break;

      default:
        break;
    }
  return (
    <div className="bg-i">
      {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl  space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
      <div className="text-center space-y-2 sm:text-left ">
        <NavYesOrNo
          text={err ?? ""}
          yes={false}
          f={(a: any) =>
            setSearchParams((prev) => {
              if(errCode)prev.set("errCode", "");
              if(err && !errCode) prev.set("err", "");
              return prev;
            })
          }
        />
        <div className="space-y-0.5">
          <h1
            style={{ padding: 15.4 }}
            className="text-slate-500 font-medium logo text-primary"
          >
            Game Books
          </h1>
          <br />

          <h3 className="font-medium text-dark">Здравей {user}</h3>
        </div>
      </div>
      {/* </div> */}
      <br />
      <Link to="/newBook" className="text-center centered">
        <span className="text-slate-500 font-medium logo text-center text-primary">
          Нова книга
        </span>
      </Link>
      <Link to="/logout" className="text-center centered">
        <span className="text-slate-500 font-medium logo text-center text-primary">
          Излез от профила
        </span>
      </Link>
      {books.map((e, i) => (
        <BookHeader e={e} key={i} />
      ))}
      {/* </div> */}
      <br />
    </div>
  );
}
