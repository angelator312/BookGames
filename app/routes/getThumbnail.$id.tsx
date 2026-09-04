import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import getImageStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";

export async function loader({request,params}:LoaderFunctionArgs)
{
    const user=await requireUserId(request);
    if (!user)return redirect("/");
    const imStore=await getImageStore();
    // console.log(params.id,user);
    const img= await imStore.getImageById(params.id ?? "");
    // console.log(img);
    if(img)
    {
        return new Response(img.thumbnail.buffer.slice(), {
            headers: {
                "Content-Type":img.mimeType ,
            },
        }); 
    }else 
    {
        return new Response("Not Found The Image", {
            status: 404,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}