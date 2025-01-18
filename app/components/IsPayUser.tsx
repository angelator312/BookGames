import { PersonCheckFill } from "react-bootstrap-icons";
import type { UserData } from "~/utils/User";

export default function IsProUser({usD}: {usD: UserData}) {
   if (usD.isPro) {
    if (usD.verifiedAuthor) {
      return (
        <span>
          <PersonCheckFill />
          {/* neshto za Pro */}
        </span>
      );
    }
  } else if (usD.verifiedAuthor) {
    return (
      <span>
        <PersonCheckFill />
      </span>
    );
  }
  return <></>;
}
