import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false}/>
          <Cards>
            <Card
              route="/home/teams"
              title="Equipo"
              imageUrl="../../assets/images/team.png"
              description=""
            />
            <Card
              route="/home/centres"
              title="Instalaciones"
              imageUrl="../../assets/images/centre.png"
              description=""
            />
          </Cards>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const Cards = styled.div`
  text-align: center;
  align-items: center;
  height: 80%;
`;

export default Home;
