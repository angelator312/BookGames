import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";

export async function loader({ request }: LoaderFunctionArgs) {
  const form =new URL(request.url).searchParams;
  if (!form) return redirect("/");
  //console.log(form);
  
  const a = await requireUserId(request, false);
  if (!a) return redirect("/login?redirectTo="+request.url);
  const uStore = await getUserStore();
  const forMeDescription = form.get("forMe")?.toString();
  const user = await uStore.getUser(a);
  if(!user) return redirect("/login?redirectTo="+request.url);
  const data=user.data;
  if (typeof forMeDescription == "string")
      data.forMe = forMeDescription;
    
  //settings.language="bg";
  uStore.adjustUserData(data, a);
  return redirect(form.get("toUrl")??"/?successCode=1");
}