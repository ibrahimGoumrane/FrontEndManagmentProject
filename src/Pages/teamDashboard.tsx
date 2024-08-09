import { useParams } from "react-router-dom";

function TeamListing() {
  const { id: teamId } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Team Listing</h1>
      <p>Team ID: {teamId}</p>
    </div>
  );
}
export default TeamListing;
