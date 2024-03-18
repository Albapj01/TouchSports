import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import Card from "frontend/src/components/card/card";
import List from "frontend/src/components/list/list";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";

const Player = () => {
  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Margin />
          <ImageContainer>
            <Image
              src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
            />
          </ImageContainer>
          <List />
          <Space />
          <Card
            route=""
            title="Alimentación"
            imageUrl="https://s1.eestatic.com/2021/08/06/ciencia/nutricion/602206906_199716223_1706x960.jpg"
            description=""
          />
          <Card
            route=""
            title="Entrenamientos personalizados"
            imageUrl="https://cope-cdnmed.cope.es/resources/jpg/1/3/1686821467631.jpg"
            description="Estiramientos y ejercicios adicionales para mejorar el rendimiento y fortalecer lesiones"
          />
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Image = styled.img`
  border-radius: 50%;
  width: 40%;
`;

const ImageContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-bottom: 10%;
`;

const Margin = styled.div`
  margin-top: 15%;
`;

const Space = styled.div`
  margin-top: 10%;
`;

export default Player;
