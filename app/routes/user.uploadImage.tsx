import type { ActionFunctionArgs } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import getFileStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request, false);
  if (!userId)
    return new Response("Not Found The User", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });

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
      const fileStore = await getFileStore();
      return(await fileStore.addImage(
        filename,
        userId,
        contentType,
        Buffer.concat(arr)
      )).id;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  // formData.forEach((entry) => {});
  return formData.get("file");
  // because our uploadHandler returns a string, that's what the imageUrl will be.
  // ... etc
};
