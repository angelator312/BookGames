import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user =await requireUserId(request, false);
//   console.log(user);
  
  if (typeof user === "string") {
    const url = new URL(request.url);
    const sParams = url.searchParams;
    const id = sParams.get("id");
    if (id) {
      const toUrl = sParams.get("toUrl");
      if (typeof toUrl === "string") {
        const iStore = await getImageStore();
        const image = await iStore.deleteImage(id, user);
        if (image) return redirect(toUrl);
        else return redirect(toUrl + "errorInDeletion=true");
      }
    }
    return redirect("/");
  } else {
    return redirect("/login");
  }
}
