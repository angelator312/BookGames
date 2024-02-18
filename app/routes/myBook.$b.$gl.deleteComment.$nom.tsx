import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import getTextStore from "~/utils/textStore";
export async function action({ params, request }: ActionFunctionArgs) {
  return redirect(`/`);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  if (!request.url.match(/\?/)) return redirect(`/`);
  const book = params.b;
  const gl = params.gl;
  const nom = params.nom;
  if (!(book && gl && nom) || Number.isNaN(parseInt(nom))) return redirect(`/`);
  // console.log(book, gl, nom);
  const tStore = await getTextStore();
  await tStore.deleteComment(book, gl, parseInt(nom))
  return redirect(`/myBook/${book}/${gl}`);
}
