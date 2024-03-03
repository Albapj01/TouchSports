import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import styled from "styled-components";

const Centres = () => {
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar></IonToolbar>
          </IonHeader>
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

const Cards = styled.div`
  font-size: small;
  text-align: center;
  align-items: center;
`;

const CentresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
  font-size: small;
`;

export default Centres;
