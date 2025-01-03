import type { LoaderFunctionArgs} from "@remix-run/node";
import { loadSettings, requireUserId } from "~/utils/session.server";
import type { SettingsInterface } from "~/utils/userStore";
import getUserStore from "~/utils/userStore";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    let settings: SettingsInterface = await loadSettings(a);
    settings.tutorial=false;
    await (await getUserStore()).adjustSettings(settings,a);
    console.log("YES");
    
    return "Yes";
  }
  return "No";
};