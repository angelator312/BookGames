import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import getTextStore from "~/utils/textStore";
export async function loader({ params, request }: ActionFunctionArgs) {
  const book = params.b;
  if (!book)
    // console.log(targetBook);
    return redirect(`/`);
  // let b = await getGorB("book");
  // console.log(b);
  const tStore = await getTextStore();
  const targetBook = await tStore.getBook(`${book}`);
  
  await tStore.addBook(
    targetBook?.id??"",
    targetBook?.avtor ?? "",
    true,
    targetBook?.text2??"",
    targetBook?.doGl??"",
    parseInt(targetBook?.text.at(-1)??"-1")
  );

  return redirect(`/myBook/${book}/1?feedCode=2`);
}
export async function action({ params }: LoaderFunctionArgs) {
  return redirect(`/`);
}
