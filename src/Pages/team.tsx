import { useNavigate, useParams } from "react-router-dom";
import { Teamprovider } from "../utils/Contexte/TeamContext/teamContexteprovider";
import TeamDashboard from "./teamDashboard";

export default function TeamMain() {
  const { id: teamId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!teamId) return navigate("*");
  return (
    <Teamprovider teamId={teamId}>
      <TeamDashboard teamId={teamId} />
    </Teamprovider>
  );
}
