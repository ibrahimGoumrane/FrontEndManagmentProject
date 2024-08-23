import {
  authorisation,
  autorisationModel,
  ModuleType,
  Action,
} from "../../models/auth.ts";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import ModalUpdate from "./modalUpdate.tsx";
import { useState } from "react";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte.ts";
import {
  createTaskManagerAuth,
  updateTaskManagerAuth,
  DeleteTaskAuth,
} from "../../network/authApi.ts";
interface ItemProps {
  member: autorisationModel;
  handleDelete: (id: string, moduleId: string, memeberId: string) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  kickMember: (memeberId: string) => void;
}
export default function Item({
  member,
  handleDelete,
  setErrorMessage,
  kickMember,
}: ItemProps) {
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const { members, updateMembers, project } = useProject();
  function onCreatedSuccessfully(
    moduleId: string,
    memeberId: string,
    moduleType: string,
    action: string
  ) {
    async function saveNewAuth() {
      const newAuth: authorisation = {
        moduleId: moduleId,
        moduleType: moduleType as ModuleType,
        action: action as Action,
      };
      const newMembers = members.find(
        (member) => member.id.toString() === memeberId.toString()
      );
      if (newMembers) {
        try {
          const authExists = newMembers?.auth.some(
            (auth: authorisation) =>
              auth.moduleId === moduleId &&
              auth.moduleType === newAuth.moduleType &&
              auth.action === newAuth.action
          );

          if (authExists) {
            setErrorMessage("User already have this permission");
          } else {
            if (action === "CREATE") {
              await createTaskManagerAuth({
                userId: memeberId,
                moduleId: moduleId,
              });
            } else if (action === "UPDATE") {
              await updateTaskManagerAuth({
                userId: memeberId,
                moduleId: moduleId,
              });
            } else if (action === "DELETE") {
              await DeleteTaskAuth({
                userId: memeberId,
                moduleId: moduleId,
              });
            } else {
              setErrorMessage(
                "An Error Occured during your choice , permission has not been given , try Again. "
              );
            }

            const newMembersList = members.filter((member) => {
              return member.id.toString() !== memeberId.toString();
            });
            const updatedUser: autorisationModel = {
              ...newMembers,
              auth: [...newMembers.auth, newAuth],
            };
            updateMembers([...newMembersList, updatedUser], false);
          }
        } catch (error) {
          setErrorMessage((error as Error).message);
        }
      }
    }

    saveNewAuth();
  }
  return (
    <>
      {modalUpdate && (
        <ModalUpdate
          setModalUpdate={setModalUpdate}
          modalUpdate={modalUpdate}
          onCreatedSuccessfully={onCreatedSuccessfully}
          memeberId={member.id}
          moduleId={project?.id?.toString() ?? ""}
        />
      )}

      <div className=" flex-1 h-full py-12 px-10 mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg ">
        <div className="border-b px-4 pb-6">
          <div className="flex items-end justify-end">
            <button
              className="flex items-center justify-center py-2 px-3 border-red-200 border bg-red-500  text-white hover:bg-red-600 rounded-md text-sm font-bold"
              onClick={() => kickMember(member.id)}
            >
              Delete User
            </button>
          </div>
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={member.profileImg ? member.profileImg.toString() : ""}
              alt="Profile Picture"
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {member.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <MdAlternateEmail />
                {member.email}
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 mt-5">
          <div className="flex gap-2 items-start text-gray-800 dark:text-gray-300 mb-4 flex-col ">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xl font-bold">Roles:</span>
              <span
                className="text-xl font-bold rounded-full bg-gray-100 cursor-pointer text-black p-3 hover:bg-transparent"
                onClick={() => setModalUpdate(true)}
              >
                <IoMdAdd />
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full max-h-[18vh] overflow-x-hidden overflow-y-scroll ">
              {member.auth && member.auth.length !== 0 ? (
                member.auth.map((auth, index) => (
                  <div
                    key={index}
                    className="flex flex-1 items-center justify-between  flex-shrink-0 flex-grow-0  relative z-50 mx-2 "
                  >
                    <span className="text-sm font-bold text-slate-900 capitalize italic   basis-1/4 ">
                      {auth.moduleType}
                    </span>
                    <span className="text-sm font-light  text-gray-500 capitalize basis-1/4 italic text-center ">
                      Can :
                    </span>
                    <span className="text-sm font-bold text-purple-900 lowercase italic  basis-1/4 capitalize flex-shrink flex-grow text-center">
                      {auth.action}
                    </span>
                    <span
                      className="bg-gray-100 text-red-400 hover:bg-transparent hover:text-red-500 p-2 rounded-full cursor-pointer"
                      onClick={() => {
                        if (auth.id) {
                          handleDelete(auth.id, auth.moduleId, member.id);
                        }
                      }}
                    >
                      <FaRegTrashAlt />
                    </span>
                  </div>
                ))
              ) : (
                <div>
                  <span className="text-xl font-bold text-slate-900 capitalize italic   ">
                    No roles
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
