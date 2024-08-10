import { ListGroup } from "flowbite-react";
import { useUser } from "../../utils/Contexte/UserContext/userContexte.ts";
import { Link } from "react-router-dom";

export default function TeamListings() {
  const { teams } = useUser();

  return (
    <div className="flex justify-center absolute left-full top-0.5 pl-1 rounded-sm">
      <div className="rounded-sm">
        <ListGroup className="w-48 flex flex-col rounded-sm">
          {teams && teams.length > 0 ? (
            teams.slice(0, 3).map((team) => (
              <Link
                to={`/home/teams/${team.id}`}
                key={team.id}
                id={`${team.id}`}
              >
                <div className="flex w-full items-center justify-between rounded-sm font-semibold py-2 hover:bg-gray-100 px-2">
                  {team.id}
                  <p className="ml-2   font-mono text-black ">{team.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <ListGroup.Item>No teams yet</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  );
}
