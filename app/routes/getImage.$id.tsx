import type { LoaderFunctionArgs } from "@remix-run/node";
import { ObjectId } from "mongodb";
import getFileStore from "~/utils/fileStore";
import { requireUserId } from "~/utils/session.server";

export async function loader({request,params}:LoaderFunctionArgs)
{
    const user=await requireUserId(request);
    const imStore=await getFileStore();
    const a = new ObjectId(params.id);
    console.log(params.id,user,a);
    const img= await imStore.getImage(new ObjectId(params.id??""),user);
    // console.log(img);
    if(img)
    {
        return new Response(img.data.buffer, {
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