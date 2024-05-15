import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import api from "frontend/src/utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import { Player } from "frontend/src/utils/interfaces/Player";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  teamId: string;
  playerId: string;
}

const PlayerInfo = () => {
  const { teamId, playerId } = useParams<RouteParams>();
  const [player, setPlayer] = useState<Player>();

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api.getPlayerById(payload.sub, teamId, playerId).then((result) => setPlayer(result.player));
  }, []);

  
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
          <IonList inset={true}>
            <IonItem color="light">
              <IonLabel>Nombre</IonLabel>
              <MarginList>
                <IonLabel>{player ? player.name : ''}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Apellidos</IonLabel>
              <MarginList>
                <IonLabel>{player ? player.surname : ''}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Teléfono</IonLabel>
              <MarginList>
                <IonLabel>Example</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Correo</IonLabel>
              <MarginList>
                <IonLabel>{player ? player.email : ''}</IonLabel>
              </MarginList>
            </IonItem>
          </IonList>{" "}
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

const MarginList = styled.div`
  margin-right: auto;
`;

export default PlayerInfo;
