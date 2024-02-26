import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import styled from "styled-components";


const Home = () => {
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
