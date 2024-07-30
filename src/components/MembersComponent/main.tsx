import { useCallback } from "react";
import { User } from "../../models/Users";

interface MembersComponentProps {
  updateMembers: (users: User[]) => void;
  members: User[];
}

const MembersComponent = ({
  updateMembers,
  members,
}: MembersComponentProps) => {
  useCallback(() => {
    console.log(updateMembers);
    console.log(members);
  }, [members, updateMembers]);

  return (
    <div>
      <h1>Members</h1>
    </div>
  );
};
export default MembersComponent;
