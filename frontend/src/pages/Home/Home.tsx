import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Menu from "frontend/src/components/Menu/Menu";
import Tabs from "frontend/src/components/Tabs/Tabs";

const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar></IonToolbar>
          </IonHeader>
          <Menu />
          <Cards>
            <Card
              title="Equipo"
              imageUrl="https://www.infisport.com/media/amasty/blog/SprintDeportesEquipo1_2.jpg"
              description=""
            />
            <Card
              title="Instalaciones"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
              description=""
            />
          </Cards>
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
  height: 80%;
`;

export default Home;
