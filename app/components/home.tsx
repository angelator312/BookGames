import { Link } from "@remix-run/react";
import type { TextOrBs } from "~/utils/textStore";
import FormComponent from "./formComp";

export default function Home({
  user,
  books,
}: {
  user: string;
  books: TextOrBs[];
}) {
  // const userId = useLoaderData<string>();
  return (
    <div>
      {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl  space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <h1
            style={{ padding: 15.4 }}
            className="text-slate-500 font-medium logo text-primary"
          >
            Game Books
          </h1>
          <br />

          <h3 className="font-medium text-dark">Hello {user}</h3>
        </div>
      </div>
      {/* </div> */}
      <br />
      {books.map((e, i) => (
        <div className="text-center space-y-2 sm:text-left centered" key={i}>
          {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
          <table className="text-center centered m-l-15%">
            <tbody className="centered ">
              <tr className="centered ">
                <Link to={`/book/${e.text}`}>
                  <td className="text-center p-r-3">
                    <div className="space-y-0.5 text-center">
                      <img
                        src="/img/book.png"
                        alt="Book"
                        width={60}
                        height={60}
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="space-y-0.5 text-center">
                      <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark">
                        {e.id?.substring(5, e.id?.length - 3)}
                      </h3>
                      <h4 className="text-j text-slate-500 font-medium logo text-bold text-dark">
                        {/* <br /> */}
                        Автор: {e.avtor}
                      </h4>
                    </div>
                    {/* <br /> */}
                    <br />
                  </td>
                  </Link>
                {/* 
                <td className="text-center">
                  <div className="space-y-0.5 text-center">
                    <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark">
                      {e.public ? (
                        ""
                      ) : (
                        <FormComponent
                          textForSubmit="Publish"
                          to={`/myBook/${e.text}/publish`}
                        />
                      )}
                    </h3>
                  </div>
                  <br />
                  <br />
                </td> */}
              </tr>
            </tbody>
          </table>
          {/* </div> */}
        </div>
      ))}
      <Link to="/newBook" className="text-center centered">
        <span className="text-slate-500 font-medium logo text-center text-primary">
          New book
        </span>
      </Link>
      <Link to="/logout" className="text-center centered">
        <span className="text-slate-500 font-medium logo text-center text-primary">
          Log out
        </span>
      </Link>
      {/* </div> */}
      <br />
    </div>
  );
}
