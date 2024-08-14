import { autorisationModel } from "../../models/auth.ts";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface ItemProps {
  member: autorisationModel;
  handleDelete: (id: string, moduleId: string, memeberId: string) => void;
}
export default function Item({ member, handleDelete }: ItemProps) {
  return (
    <div className=" flex-1 h-full py-12 px-10 mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg ">
      <div className="border-b px-4 pb-6">
        <div className="text-center my-4">
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src="https://randomuser.me/api/portraits/women/21.jpg"
            alt=""
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
      <div className="px-4 py-4">
        <div className="flex gap-2 items-start text-gray-800 dark:text-gray-300 mb-4 flex-col ">
          <div className="w-full flex items-center justify-between">
            <span className="text-xl font-bold">Roles:</span>
            <span className="text-xl font-bold rounded-full bg-gray-100 cursor-pointer text-black p-3 hover:bg-transparent">
              <IoMdAdd />
            </span>
          </div>
          <span className="flex flex-col gap-1 w-full">
            {member.auth && member.auth.length !== 0 ? (
              member.auth.map((auth, index) => (
                <div
                  key={index}
                  className="flex flex-1 items-center justify-between"
                >
                  <span className="text-sm font-bold text-slate-900 capitalize italic  ">
                    {auth.moduleType}
                  </span>
                  <span>{" => "}</span>
                  <span className="text-sm font-bold text-purple-900 lowercase italic ">
                    {auth.action}
                  </span>
                  <span
                    className="bg-gray-100 text-red-400 hover:bg-transparent hover:text-red-500 p-2 rounded-full cursor-pointer"
                    onClick={() => {
                      handleDelete(auth.id, auth.moduleId, member.id);
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
          </span>
        </div>
      </div>
    </div>
  );
}
