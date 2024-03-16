import { Link } from "@remix-run/react";
import FormComponent from "./formComp";
import { OverlayTrigger } from "react-bootstrap";

export default function BookHeader({
  e,
  avt = false,
}: {
  e: any;
  avt?: boolean;
}) {
  if (!e) return;
  avt = !avt;
  return (
    <div className="text-center space-y-2 sm:text-left centered">
      {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
      <table className="text-center centered m-l-15%">
        <tbody className="centered ">
          <tr className="centered ">
            <td className="text-center p-r-3">
              <div className="space-y-0.5 text-center">
                <img src="/img/book.png" alt="Book" width={60} height={60} />
              </div>
            </td>
            <td className="text-center">
              <OverlayTrigger
                placement="right"
                overlay={
                  <div className="space-y-0.5 text-center m-l-3">
                    <h4 className="text-j text-slate-500 font-medium logo text-bold text-dark">
                      <p>{e.text2}</p>
                    </h4>
                  </div>
                }
              >
                <Link to={`/book/${e.text}`}>
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
                </Link>
              </OverlayTrigger>
            </td>
          </tr>
          <tr>
            <td className="text-center">
              <div className="space-y-0.5 text-center">
                <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark m-l-3">
                  {e.public ? (
                    ""
                  ) : (
                    // <form method="post" action={`/myBook/${e.text}/publish`}>
                    //   <input className="bg-book-c" type="submit" value={"Publish"} />
                    // </form>
                    <FormComponent
                      submitVariant="danger"
                      textForSubmit="Publish"
                      to={`/myBook/${e.text}/publish`}
                    />
                  )}
                </h3>
              </div>
            </td>
            <td className="text-center">
              <div className="space-y-0.5 text-center">
                <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark m-l-3">
                  {avt ? (
                    ""
                  ) : (
                    <FormComponent
                      method="get"
                      submitVariant="secondary"
                      textForSubmit="Delete"
                      to={`/delete/${e.text}/`}
                    />
                  )}
                </h3>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
}
