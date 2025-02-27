import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { neDumi } from "~/helps/dumiNe";
import { neEn } from "~/helps/dumiNeEn";
import getTextStore from "~/utils/textStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let istoriaText = form.get("text1") ?? " ";
  let izboriText = form.get("text2") ?? " ";
  const glava = params.gl;
  const book = params.b;
  if (!glava || Number.isNaN(parseInt(glava))) {
    return false;
  }
  if (!izboriText) izboriText = "=>(Глава " + (1 + parseInt(glava)) + ")[Следваща]";
  if (!istoriaText && !izboriText) {
    return false;
    // return redirect(`/myBook/${book}/${glava}?errCode=1`);
  }
  // let b = await getGorB("book");
  // console.log(b);
  for (let i = 0; i < neDumi.length; i++) {
    // console.log(neDumi[i]);
    istoriaText = istoriaText.toString().replaceAll(neDumi[i], "duma");
    izboriText = izboriText.toString().replaceAll(neDumi[i], "duma");
  }
  for (let i = 0; i < neEn.length; i++) {
    // console.log(neDumi[i]);
    istoriaText = istoriaText.toString().replaceAll(neEn[i], "duma");
    izboriText = izboriText.toString().replaceAll(neEn[i], "duma");
  }

  const tStore = await getTextStore();
  //@ts-ignore
  await tStore.addText(
    `${book}-${glava}`,
    istoriaText.toString(),
    izboriText.toString() ?? ""
  );

  return true;
  // return redirect(`/myBook/${book}/${glava}?feedCode=1`);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.gl;
  const book = params.bk;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);
  return redirect(`/myBook/${book}/${glava}`);
}
