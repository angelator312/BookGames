import { Link } from "@remix-run/react";

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
        {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <h3 className="text-slate-500 font-medium logo text-bold text-dark">
              Голямото приключение (Автор: Никола Райков, Редактор: Емануил
              Томов)
            </h3>
          </div>
          <br />
          <br />
          <Link to="/logout">
            <span className="text-slate-500 font-medium logo text-primary">
              Log out
            </span>
          </Link>
        </div>
        {/* </div> */}
      </Link>
      <br />
    </div>
  );
}
