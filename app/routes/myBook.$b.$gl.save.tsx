import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import getTextStore from "~/utils/textStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let text1 = form.get("text1");
  let text2 = form.get("text2");
  const glava = params.gl;
  const book = params.b;
  if (!text1 || !text2) {
    return redirect(`/myBook/${book}/${glava}?err=Please input text!`);
  }
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);

  // let b = await getGorB("book");
  // console.log(b);
  const tStore = await getTextStore();
  await tStore.addText(`${book}-${glava}`, text1?.toString() ?? "", text2.toString()??"");

  return redirect(`/myBook/${book}/${glava}?feed=Saving is done!`);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.gl;
  const book = params.bk;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);
  return redirect(`/myBook/${book}/${glava}`);
}
