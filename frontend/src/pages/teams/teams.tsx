import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import api from "frontend/src/utils/api/api";
import { useEffect, useState } from "react";
import { Team } from "frontend/src/utils/interfaces/Team";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api.getAllTeams(payload.sub).then((result) => setTeams(result.teams));
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Cards>
            {teams &&
              teams.map((team) => (
                <Card
                  key={team.teamId}
                  route={`/home/teams/${team.teamId}`}
                  title={team.name}
                  imageUrl="https://www.infisport.com/media/amasty/blog/SprintDeportesEquipo1_2.jpg"
                  description=""
                />
              ))}
          </Cards>
          <ButtonContainer>
            <Link to="/home/teams/add-team">
              <Button
                color="primary"
                icon={addCircleOutline}
                text="Añadir equipo"
              />
            </Link>
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Cards = styled.div`
  text-align: center;
  align-items: center;
  /* height: 80%; */
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

export default Teams;
