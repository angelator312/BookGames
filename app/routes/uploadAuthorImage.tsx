import type { ActionFunctionArgs } from "@remix-run/node";
import {
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { MAX_FILE_SIZE } from "~/utils/Consts";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";

export const action = async ({ request }: ActionFunctionArgs) => {
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
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (contentType != "image/png" && contentType != "image/jpeg") {
        return undefined;
      }
      if (!filename) return undefined;
      // save the image
      const arr = [];
      for await (const chunk of data) {
        // save the chunk
        arr.push(chunk);
      }
      const fileStore = await getImageStore();
      const poslArray = Buffer.concat(arr);
      if (poslArray.byteLength < MAX_FILE_SIZE)
        return (
          await fileStore.addImage(filename, userId, contentType, poslArray)
        ).id;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  // console.log(request);

  // const a = (await request.formData()).get("toUrl");
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  let imgUrl = "";
  formData.forEach((entry) => {
    if (!imgUrl) imgUrl = entry.toString();
    console.log(entry);
  });
  v.authorImg = "/getImage/" + imgUrl;
  uStore.adjustUserData(v, userId);
  // formData.forEach((entry) => {});
  return redirect("/profil?koe=3");
  // because our uploadHandler returns a string, that's what the imageUrl will be.
  // ... etc
};
