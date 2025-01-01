import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";

export async function loader({ request }: LoaderFunctionArgs) {
  const form =new URL(request.url).searchParams;
  if (!form) return redirect("/");
  console.log(form);
  
  const a = await requireUserId(request, false);
  if (!a) return redirect("/login");
  const uStore = await getUserStore();
  const fontSize = form.get("fontSize")?.toString();
  const settings = await uStore.getMySettings(a);
  if (typeof fontSize == "string")
    if (!Number.isNaN(parseInt(fontSize))) {
      settings.fontSize = parseInt(fontSize);
    }
  //settings.language="bg";
  uStore.adjustSettings(settings, a);
  return redirect("/?successCode=1");
}