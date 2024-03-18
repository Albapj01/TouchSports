import { IonContent, IonFooter, IonHeader, IonImg, IonPage, IonSearchbar } from "@ionic/react";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";

const Centres = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <IonSearchbar placeholder="Buscar"></IonSearchbar>
          <CentresContainer>
            <Card
              route=""
              title="Polideportivo 1"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
              description=""
            />
            <Card
              route=""
              title="Polideportivo 2"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
              description=""
            />
          </CentresContainer>
          <Card
            route=""
            title="Polideportivo 3"
            imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
            description=""
          />
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const CentresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
  font-size: small;
`;

export default Centres;
