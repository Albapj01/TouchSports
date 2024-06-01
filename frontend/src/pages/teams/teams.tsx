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
      return "https://deportesinfantes.home.blog/wp-content/uploads/2022/06/4c02d07721d0182926385c17ddf3959bfe805f76.jpg?w=768"; 
    } else if (teamName.toLowerCase().includes("futbol") || teamName.toLowerCase().includes("fútbol")) {
      return "https://sisanjuan.b-cdn.net/media/k2/items/cache/665038ef3f33718594773fb6b1e055ef_XL.jpg"; 
    } else if (teamName.toLowerCase().includes("balonmano")) {
      return "https://t4.ftcdn.net/jpg/01/80/02/51/360_F_180025190_7Lt5WDVLnkYHUPZR5X9cJVxFnMbtPSJN.jpg"; 
    } else if(teamName.toLowerCase().includes("volley") || teamName.toLowerCase().includes("voleibol")){
      return "https://www.experienceboxspain.com/sites/default/files/styles/product_full/public/products/BeachVolley%20%281%29_0.jpg?h=cb3eb245&itok=6hYM_HIE"
    }
    return "https://www.infisport.com/media/amasty/blog/SprintDeportesEquipo1_2.jpg"; 
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
