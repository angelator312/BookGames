import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { glavi } from "~/helps/text-Gp";
import { Special } from "~/helps/text2-Gp";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";
import getUserStore from "~/utils/userStore";
export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  if (typeof userId === "string") {
    const uStore = await getUserStore();
    const user = await uStore.isAdmin(userId);
    if (user) {
      const tStore = await getTextStore();
      let glava = 1;
      for (const e of glavi) {
        await tStore.addText(
          `Gp-${glava}`,
          e,
          Special[glava-1]
        );
        ++glava;
      }
      return redirect("/admin/");
    }
  }
  return redirect("/");
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/admin/");
};
