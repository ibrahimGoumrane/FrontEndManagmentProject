import { useState } from "react";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import AddSkills from "./addSkills";

export default function UpdateSkills() {
  const { skills, updateSkills } = useUser();
  const [addSkills, setAddSkills] = useState<boolean>(false);

  function handleAddSkills() {
    setAddSkills((addSkills) => !addSkills);
  }
  return (
    <div className="text-slate-900 w-auto flex  justify-center flex-col">
      <h2 className="text-lg font-bold text-left text-white ">Skills</h2>
      <div>
        <ul className="flex flex-wrap items-center justify-center my-3 gap-2 max-w-full h-auto">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <li
                key={skill}
                className="text-xs font-medium text-purple bg-white rounded-xl px-3 flex items-center justify-center py-2"
              >
                {skill}
              </li>
            ))
          ) : (
            <li>No skills</li>
          )}
        </ul>
      </div>

      <div className="flex items-center justify-center  w-full">
        <button
          onClick={handleAddSkills}
          className="bg-white px-3 font-bold text-md italic flex items-center justify-center py-2 rounded-md border-black border flex-1"
        >
          Add more skills
        </button>
      </div>
      {addSkills && (
        <AddSkills
          onAddedSuccessfully={() => {
            setAddSkills(false);
          }}
          addSkills={addSkills}
          updateSkills={updateSkills}
          setaddSkills={setAddSkills}
          skills={skills || []}
        />
      )}
    </div>
  );
}
