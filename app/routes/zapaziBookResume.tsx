import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";

export async function action({ request, params, context }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  if (user) {
    const formData = await request.formData();
    const text=formData.get('text')?.toString();
    const bId = formData.get("book")?.toString();
    if (text&&bId) {
      const tStore=await getTextStore();
      const book=await tStore.getBook(bId);
      if (book) {
        if(book.avtor==user)
        { 
          await tStore.setBook({id:bId,text2:text});
          return redirect(`/myBook/${bId}`);
        }
      }
    }
  }
  return redirect("/");
}
