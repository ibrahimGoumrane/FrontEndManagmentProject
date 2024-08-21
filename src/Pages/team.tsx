import { useParams } from "react-router-dom";
import { Teamprovider } from "../utils/Contexte/TeamContext/teamContexteprovider";
import MainChatPage from "../components/Team/components/mainTeam/mainChatPage";

export default function TeamMain() {
  const { id: teamId } = useParams<{ id: string }>();
  return (
    <Teamprovider teamId={teamId || ""}>
      <MainChatPage teamId={teamId || ""} />
    </Teamprovider>
  );
}
