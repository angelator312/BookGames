import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";

export async function action({ request, params, context }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  if (user) {
    const formData = await request.formData();
    const oldPassword = formData.get("oldPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    const newPassword2 = formData.get("newPassword2")?.toString();
    const users = await getUserStore();
    if (!newPassword) return redirect("/profil?koe=2&error=2");
    if (!oldPassword) return redirect("/profil?koe=2&error=2");
    if (!newPassword2) return redirect("/profil?koe=2&error=2");
    if (newPassword !== newPassword2) return redirect("/profil?koe=2&error=3");
    if (newPassword.length < 8) return redirect("/profil?koe=2&error=2");
    const userCheck = await users.checkUser(user, oldPassword);
    if (!userCheck) {
      return redirect(`/profil?koe=2&error=4`);
    }
    if (oldPassword === newPassword) return redirect("/profil?koe=2&good=1");

    if (await users.changePassword(user, newPassword))
      return redirect("/profil?koe=2&good=1");
    else return redirect("/profil?koe=2&error=5");
  }

  return redirect("/profil");
}
