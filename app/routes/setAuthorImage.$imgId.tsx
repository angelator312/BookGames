import type { ActionFunctionArgs } from "@remix-run/node";
import {
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { LoaderFunctionArgs } from "react-router";
import { MAX_FILE_SIZE } from "~/utils/Consts";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request, false);
  if (!userId)
    return new Response("Not Found The User", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });

  const uStore = await getUserStore();
  const user = await uStore.getUser(userId);
  if (!user)
    return new Response("Not Found The User", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  let v = user.data;
  let imgId = params.imgId;
  if (!imgId)
    return new Response("Not Found The Image", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  v.authorImg = "/getImage/" + imgId;
  uStore.adjustUserData(v, userId);
  // formData.forEach((entry) => {});
  return redirect("/profil?koe=1");
  // because our uploadHandler returns a string, that's what the imageUrl will be.
  // ... etc
};
