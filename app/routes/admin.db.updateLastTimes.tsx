import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import getLastTimeStore from "~/utils/lastTimeStore";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";
export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  if (typeof userId === "string") {
    const uStore = await getUserStore();
    const user = await uStore.isAdmin(userId);
    if (user) {
      (await getLastTimeStore()).FixDatabase();
      return redirect("/admin/");
    }
  }
  return redirect("/")
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  
  return redirect("/admin/");
};

