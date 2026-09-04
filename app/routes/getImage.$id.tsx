import type { LoaderFunctionArgs } from "@remix-run/node";
import getImageStore from "~/utils/fileStore";

export async function loader({request,params}:LoaderFunctionArgs)
{
    const imStore=await getImageStore();
    const img= await imStore.getImageById(params.id ?? "");
    // console.log(img);
    if(img)
    {
        return new Response(img.data.buffer.slice(), {
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