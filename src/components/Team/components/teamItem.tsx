import { Dropdown } from "flowbite-react";
import { BiRightArrowAlt } from "react-icons/bi";
import { TeamData } from "../../../models/Teams";
import { requestToJoin } from "../../../network/TeamApi";

interface ItemProps {
  team: TeamData;
  handleJoinRequest: () => void;
}

const TeamItem = ({ team, handleJoinRequest }: ItemProps) => {
  const requestToJoinTheTeam = () => {
    async function requesting() {
      await requestToJoin(team);
      handleJoinRequest();
    }
    requesting();
  };
  return (
    <li
      key={team.id}
      className="w-5/6 mx-auto  bg-slate-900 text-white min-h-16 flex items-center justify-between rounded-md pl-5 font-semibold font-mono text-lg "
    >
      <span>{team.name}</span>
      <div>
        <button
          className="text-xs text-bold px-2 py-2 text-nowrap bg-white text-slate-900 rounded-md cursor-pointer hover:bg-slate-100"
          onClick={requestToJoinTheTeam}
        >
          Request To Join
        </button>
      </div>
      <div className="flex flex-col items-start justify-start pr-2">
        <div className="text-sm font-extralight ">
          MemberCount {team?.members?.length}
        </div>
        <div className="text-sm font-extralight flex items-center justify-center">
          <Dropdown
            label=""
            dismissOnClick={false}
            className="flex items-center justify-center"
            placement="right-start"
            renderTrigger={() => (
              <span className="text-white  rounded-md  flex min-w-28  gap-2  py-1 items-center justify-start  cursor-pointer">
                <span>Owner</span>
                <span>
                  <BiRightArrowAlt />
                </span>
              </span>
            )}
          >
            <Dropdown.Item className="text-xs text-slate-900  font-light hover:bg-transparent cursor-default">
              {team.ownerName}
            </Dropdown.Item>

            <Dropdown.Item className="text-xs text-slate-900  font-light">
              Contact
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </li>
  );
};
export default TeamItem;
