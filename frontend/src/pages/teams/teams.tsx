import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import { getStatus } from "frontend/src/utils/api";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";

const Teams = () => {
  console.log(getStatus());
  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Cards>
            <Card
              route="/home/teams/team"
              title="Equipo 1"
              imageUrl="https://www.infisport.com/media/amasty/blog/SprintDeportesEquipo1_2.jpg"
              description=""
            />
          </Cards>
          <ButtonContainer>
            <Link to="/home/teams/team/player/add-player">
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
