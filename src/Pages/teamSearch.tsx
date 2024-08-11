import { FaArrowLeft } from "react-icons/fa";
import TeamSearch from "../components/Team/components/teamSearch";

function TeamListing() {
  return (
    <main className="w-[100vw] h-[100vh] bg-slate-900 flex flex-col">

      <nav className="flex justify-between items-center">
        <div className=" inline-flex items-center justify-start gap-x-5 text-white m-5  text-xl font-bold">
          <span>
            <FaArrowLeft />
          </span>
          <span>Go back to the main Page</span>
        </div>
      </nav>
      <div className=" pt-5  w-1/2 mx-auto gapy-2 text-center mt-2 bg-white h-2/3 rounded-xl flex flex-col flex-1">
        <div className="flex items-center justify-center w-full gap-5">
          <h1 className="text-slate-900 text-3xl font-bold flex items-center justify-center">
            Team Finder
          </h1>
          <p className="text-md text-left font-semibold w-2/3">
            Start typing the team name, and let us do the rest—instant results
            at your fingertips. Simplify your search and stay connected with
            your team, all in one place.
          </p>
        </div>
        <TeamSearch />
      </div>
    </main>
  );
}

export default TeamListing;
