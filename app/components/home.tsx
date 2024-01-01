import { Link } from "@remix-run/react";
import author from "~/helps/NIkolaRaikov.png";

export default function Home({ user }: { user: string }) {
  //   const user = useLoaderData<string>();
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
      <Link to="/e-book1">
        <div className="text-center space-y-2 sm:text-left centered">
          {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
          <table className="text-center centered m-l-3">
            <tbody className="text-center centered m-l-3">
              <tr className="text-center centered m-l-3">
                <td className="text-center p-r-3">
                  <img src={author} alt="Author Nikola Raikov" />
                </td>
                <td className="text-center">
                  <div className="space-y-0.5 text-center">
                    <h3 className="centered text-center text-slate-500 font-medium logo text-bold text-dark">
                      Голямото приключение
                    </h3>
                    <h4 className="text-center text-slate-500 font-medium logo text-bold text-dark">
                      {/* <br /> */}
                      Автор: Никола Райков
                    </h4>
                    <h4 className="text-center text-slate-500 font-medium logo text-bold text-dark">
                      {/* <br /> */}
                      Редактор: Емануил Томов
                    </h4>
                  </div>
                  <br />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
          {/* </div> */}
        </div>
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
