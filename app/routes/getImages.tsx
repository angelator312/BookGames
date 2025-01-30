import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUserId(request, false);
  if (!user) return redirect("/login");
  const imStore = await getImageStore();
  const img = await imStore.listImages(user);
  // console.log(img);
  return img;
}
export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUserId(request, false);
  if (!user) return redirect("/login");
  const imStore = await getImageStore();
  const img = await imStore.listImages(user);
  // console.log(img);
  return img;
}