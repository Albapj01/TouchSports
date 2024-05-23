import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
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
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { Player } from "frontend/src/utils/interfaces/Player";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";

interface RouteParams {
  teamId: string;
  playerId: string;
}

const PlayerInfo = () => {
  const { teamId, playerId } = useParams<RouteParams>();
  const [player, setPlayer] = useState<Player>();
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const result = await api.getPlayerById(payload.sub, teamId, playerId);
        setPlayer(result.player);
      } catch (error) {
        console.error("Error al obtener el jugador:", error);
      }
    };
    fetchPlayer();
  }, []);

  const handleDeleteButtonClick = () => {
    setShowAlert(true);
  };

  const handleDeletePlayer = async () => {
    await api.deletePlayer(payload.sub, teamId, playerId);
  };

  const handleUpdateButtonClick = async () => {
    history.push(`/home/teams/${teamId}/player/${playerId}/update-player`);
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
            <FabContainer>
              <TransparentFabButton>
                <IonIcon
                  color="primary"
                  icon={ellipsisVerticalOutline}
                ></IonIcon>
              </TransparentFabButton>
              <IonFabList side="bottom">
                <IonFabButton onClick={handleUpdateButtonClick}>
                  <IonIcon color="primary" icon={pencilOutline}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={handleDeleteButtonClick}>
                  <IonIcon color="primary" icon={trashOutline}></IonIcon>
                </IonFabButton>
              </IonFabList>
            </FabContainer>
          </IonFab>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="¿Estás seguro de que quieres eliminar a este jugador?"
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  history.push(`/home/teams/${teamId}/player/${playerId}`);
                },
              },
              {
                text: "Eliminar",
                role: "confirm",
                handler: () => {
                  handleDeletePlayer();
                  history.push(`/home/teams/${teamId}`);
                },
              },
            ]}
          />
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
                <IonLabel>{player ? player.name : ""}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Apellidos</IonLabel>
              <MarginList>
                <IonLabel>{player ? player.surname : ""}</IonLabel>
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
                <IonLabel>{player ? player.email : ""}</IonLabel>
              </MarginList>
            </IonItem>
            <Space />
            <TextContainer>Mejoras</TextContainer>
            <ImprovementsContainer>
              {player ? player.improvements : ""}
            </ImprovementsContainer>
          </IonList>{" "}
          <Space />
          <Card
            route={`/home/teams/${teamId}/player/${playerId}/diet`}
            title="Alimentación"
            imageUrl="https://s1.eestatic.com/2021/08/06/ciencia/nutricion/602206906_199716223_1706x960.jpg"
            description=""
          />
          <Card
            route={`/home/teams/${teamId}/player/${playerId}/training`}
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

const FabContainer = styled.div`
  margin-top: 10%;
`;

const TransparentFabButton = styled(IonFabButton)`
  --background: transparent;
  --box-shadow: none;
`;

const ImprovementsContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;
`;

const TextContainer = styled.div`
  font-size: 17px;
  margin-left: 1%;
`;

export default PlayerInfo;
