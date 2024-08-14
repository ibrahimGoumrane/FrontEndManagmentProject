import { authorisation, autorisationModel } from "../../models/auth.ts";
import { Carousel } from "flowbite-react";
import Item from "./item.tsx";
import {
  deleteProjectAuth,
} from "../../network/authApi.ts";
import { useState } from "react";
import PopUp from "../utils/popUp.tsx";
import { PopUpType } from "../../models/utils.ts";

interface MembersComponentProps {
  members: autorisationModel[];
  updateMembers: (users: autorisationModel[], saveTodb: boolean) => void;
}
const MembersComponent = ({
  members,
  updateMembers,
}: MembersComponentProps) => {
  const [successMessage, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  function handleDelete(id: string, moduleId: string, memeberId: string) {
    async function deleteAuth() {
      await deleteProjectAuth(id, moduleId);
      const newMembers = members.find(
        (member) => member.id.toString() === memeberId.toString()
      );
      if (newMembers) {
        const newMembersList = members.filter((member) => {
          return member.id.toString() !== memeberId.toString();
        });
        const newAuth = newMembers.auth.filter(
          (auth: authorisation) => auth.id && auth.id.toString() !== id.toString()
        );
        const updatedUser: autorisationModel = {
          ...newMembers,
          auth: newAuth,
        };
        updateMembers([...newMembersList, updatedUser], false);
      }
      setSuccess(true);
    }
    deleteAuth();
  }

  return (
    <div className="h-[68vh] w-[30vw]  mx-auto">
      {successMessage && (
        <PopUp
          type={PopUpType.Success}
          message="Auth Deleted Successfully"
          setSuccess={setSuccess}
        />
      )}
      {errorMessage && (
        <PopUp
          type={PopUpType.Failed}
          message={errorMessage}
          setSuccess={setSuccess}
        />
      )}

      <Carousel slide={false}>
        {members ? (
          members.map((member, index) => {
            return (
              <div
                className="flex h-full items-center justify-center bg-purple-500 cursor-default"
                key={index}
              >
                <Item
                  member={member}
                  handleDelete={handleDelete}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            );
          })
        ) : (
          <div>
            <h1>No Members</h1>
          </div>
        )}
      </Carousel>
    </div>
  );
};
export default MembersComponent;
