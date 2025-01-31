import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({request,params,context}:ActionFunctionArgs)
{
    const formData = await request.formData();
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const newPassword2 = formData.get("newPassword2");
    console.log(oldPassword, newPassword, newPassword2);
    return null;
}