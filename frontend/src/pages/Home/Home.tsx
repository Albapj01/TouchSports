import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Menu from "frontend/src/components/Menu/Menu";

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
            />
            <Card
              title="Instalaciones"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
            />
          </Cards>
        </IonContent>
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
