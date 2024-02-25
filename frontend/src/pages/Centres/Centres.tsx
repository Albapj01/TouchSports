import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Menu from "frontend/src/components/Menu/Menu";

const Centres: React.FC = () => {
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
              title="Polideportivo 1"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
              description=""
            />
            <Card
              title="Polideportivo 2"
              imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
              description=""
            />
          </CentresContainer>
          <Card
            title="Polideportivo 3"
            imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
            description=""
          />
        </IonContent>
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
