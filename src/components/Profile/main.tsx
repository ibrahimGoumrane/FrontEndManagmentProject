import { useEffect, useState } from "react";
import ButtonMain from "./button";
import Data from "./data";
import LogoImg from "./LogoImg";
import ListSkills from "./listSkills";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";

const Main = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const { user, skills } = useUser();
  useEffect(() => {
    if (!user) return;
    setName(user?.name);
    setAge(user?.age);
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <LogoImg />
            <ButtonMain />
            <Data />
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2 text-purple-800 uppercase">
              {name} , {age}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              Casablanca , Morrocco
            </div>
            <div className="mb-2 text-blueGray-600 mt-10 text-xl font-bold">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              You are welcomed Here with Us
            </div>
            <div className="mb-2 text-blueGray-600 text-xl font-bold">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400 "></i>
              Numeric Way welcomes You
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <a
                  href="#pablo"
                  className="font-bold font-mono text-3xl mb-6 block text-purple-700  uppercase"
                >
                  Skills :
                </a>
                <div className="flex items-center justify-center">
                  <ListSkills skills={skills || ["No skills available"]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
