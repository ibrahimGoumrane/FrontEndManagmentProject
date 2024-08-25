import { authorisation, autorisationModel } from "../../models/auth.ts";
import { Carousel } from "flowbite-react";
import Item from "./item.tsx";
import { deleteProjectAuth } from "../../network/authApi.ts";
import { useState } from "react";
import PopUp from "../utils/popUp.tsx";
import { PopUpType } from "../../models/utils.ts";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte.ts";
import { useUser } from "../../utils/Contexte/UserContext/userContexte.ts";
import { useNavigate } from "react-router-dom";

const MembersComponent = () => {
  const [successMessage, setSuccess] = useState<boolean>(false);
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { members, updateMembers } = useProject();
  const navigate = useNavigate();
  function handleDelete(id: string, moduleId: string, memeberId: string) {
    async function deleteAuth() {
      try {
        await deleteProjectAuth(id, moduleId);
        const newMembers = members.find(
          (member) => member.id.toString() === memeberId.toString()
        );
        if (newMembers) {
          const newMembersList = members.filter((member) => {
            return member.id.toString() !== memeberId.toString();
          });
          const newAuth = newMembers.auth.filter(
            (auth: authorisation) =>
              auth.id && auth.id.toString() !== id.toString()
          );
          const updatedUser: autorisationModel = {
            ...newMembers,
            auth: newAuth,
          };
          updateMembers([...newMembersList, updatedUser], false);
        }
        setSuccess(true);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }
    deleteAuth();
  }
  async function kickMember(memeberId: string) {
    try {
      const newMembersList = members.filter((member) => {
        return member.id.toString() !== memeberId.toString();
      });
      await updateMembers(newMembersList, true);
      if (memeberId.toString() === user?.id.toString()) {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
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
          setSuccess={() => setErrorMessage("")}
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
                  kickMember={kickMember}
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
