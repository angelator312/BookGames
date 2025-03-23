import { ActionFunctionArgs, redirect } from "@remix-run/node";
import getCommentsStore from "~/utils/commentsStore";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";

export async function action({request}:ActionFunctionArgs)
{
    const a=await requireUserId(request);
    const formData=await request.formData();
    if(typeof a==="string")
    {
        const bId = formData.get("bookId")?.toString();
        const chapter = formData.get("chapter")?.toString();
        const text = formData.get("text")?.toString();
        if (
          typeof bId === "string" &&
          typeof chapter === "string" &&
          typeof text === "string"
        ) {
          const glava = parseInt(chapter, 10);
          if (Number.isNaN(glava)) return redirect("/book/" + bId);
          const tStore = await getTextStore();
          const book = await tStore.getBook(bId);
          if (book) {
            const commStore = await getCommentsStore();
            await commStore.addComment(a, bId, glava,  text);
            return redirect("/book/"+bId);
          }
        }
    }
    return redirect("/");
}