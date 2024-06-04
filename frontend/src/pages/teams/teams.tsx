import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";
import { useEffect, useState } from "react";
import { Team } from "frontend/src/utils/interfaces/Team";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const result = await api.getAllTeams(payload.sub);
        setTeams(result.teams);
      } catch (error) {
        console.error("Error al obtener equipos:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleImageUrl = (teamName: string) => {
    if (teamName.toLowerCase().includes("baloncesto")) {
      return "../../assets/images/basketball.png"; 
    } else if (teamName.toLowerCase().includes("futbol") || teamName.toLowerCase().includes("fútbol")) {
      return "../../assets/images/soccer.png"; 
    } else if (teamName.toLowerCase().includes("balonmano")) {
      return "../../assets/images/handball.png"; 
    } else if(teamName.toLowerCase().includes("volley") || teamName.toLowerCase().includes("voleibol")){
      return "../../assets/images/volleyball.png"
    }
    return "../../assets/images/team.png"; 
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false} />
          <Cards>
            {teams &&
              teams.map((team) => (
                <Card
                  key={team.teamId}
                  route={`/home/teams/${team.teamId}`}
                  title={team.name}
                  imageUrl={handleImageUrl(team.name)}
                  description=""
                />
              ))}
          </Cards>
          <ButtonContainer>
            <Button
              onClick={() => {
                window.location.href = "/home/teams/add-team";
              }}
              color="primary"
              icon={addCircleOutline}
              text="Añadir equipo"
            />
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false} />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Cards = styled.div`
  text-align: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

export default Teams;
