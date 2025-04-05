import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";
import { getDefaultUserData } from "~/utils/User";
import getUserStore from "~/utils/userStore";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const uId = await requireUserId(request, false);
  //   console.log(user);

  if (typeof uId === "string") {
    const url = new URL(request.url);
    const sParams = url.searchParams;
    const id = sParams.get("id");
    const uStore = await getUserStore();
    const user = await uStore.getUser(uId);
    if (id && user) {
      const userImgId = user.data.authorImg.split("/")[2];
      console.log(userImgId, ",", id);
      if (userImgId === id) {
        let usData = user.data;
        usData.authorImg = getDefaultUserData().authorImg;
        await uStore.adjustUserData(usData, uId);
      }
      const toUrl = sParams.get("toUrl");
      if (typeof toUrl === "string") {
        const iStore = await getImageStore();
        const image = await iStore.deleteImage(id, uId);
        if (image) return redirect(toUrl);
        else return redirect(toUrl + "errorInDeletion=true");
      }
    }
    return redirect("/");
  }
  return redirect("/login");
}
