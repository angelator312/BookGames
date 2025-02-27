import { PersonCheckFill } from "react-bootstrap-icons";
import type { UserData } from "~/utils/User";

export default function IsProUser({usD: userData}: {usD: UserData}) {
   if (userData.isPro) {
    if (userData.verifiedAuthor) {
      return (
        <span>
          <PersonCheckFill />
          {/* neshto za Pro */}
        </span>
      );
    }
  } else if (userData.verifiedAuthor) {
    return (
      <span>
        <PersonCheckFill />
      </span>
    );
  }
  return <></>;
}
