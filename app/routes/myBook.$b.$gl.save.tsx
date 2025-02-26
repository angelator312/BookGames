import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { neDumi } from "~/helps/dumiNe";
import getTextStore from "~/utils/textStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let text1 = form.get("text1") ?? " ";
  let text2 = form.get("text2") ?? " ";
  const glava = params.gl;
  const book = params.b;
  if (!glava || Number.isNaN(parseInt(glava)))
  {

    return false;
  }
  if(!text2)
    text2="=>(Глава "+(1+ parseInt(glava) )+")[Следваща]"
  if (!text1 && !text2) {
    return false;
    // return redirect(`/myBook/${book}/${glava}?errCode=1`);
  }
  // let b = await getGorB("book");
  // console.log(b);
  for (let i = 0; i < neDumi.length; i++) {
    // console.log(neDumi[i]);
    text1= text1.toString().replaceAll(neDumi[i],"duma");
    text2= text2.toString().replaceAll(neDumi[i],"duma");
  }

  const tStore = await getTextStore();
  //@ts-ignore
  await tStore.addText(
    `${book}-${glava}`,
    text1.toString(),
    text2.toString() ?? ""
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
