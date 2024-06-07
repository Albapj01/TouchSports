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
import { Link, useHistory, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
  logOut,
} from "ionicons/icons";
import { googleLogout } from "@react-oauth/google";

const PlayerInfo = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player>();
  const [showAlert, setShowAlert] = useState(false);
  const [trainerId, setTrainerId] = useState("");
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (teamId && playerId) {
      const fetchPlayer = async () => {
        try {
          const storedTrainerId = localStorage.getItem("trainerId");
          console.log(storedTrainerId);
          console.log(payload.sub);
          let result;

          if (storedTrainerId && storedTrainerId !== payload.sub) {
            setTrainerId(storedTrainerId);
            result = await api.getPlayerById(storedTrainerId, teamId, playerId);
            setDisabled(true);
          } else {
            result = await api.getPlayerById(payload.sub, teamId, playerId);
            setDisabled(false);
          }

          setPlayer(result.player);
        } catch (error) {
          console.error("Error al obtener el jugador:", error);
        }
      };
      fetchPlayer();
    } else {
      console.error("El jugador no existe.");
    }
  }, []);

  const handleDeleteButtonClick = () => {
    setShowAlert(true);
  };

  const handleDeletePlayer = async () => {
    if (teamId && playerId) {
      await api.deletePlayer(payload.sub, teamId, playerId);
    } else {
      console.error("El jugador no existe.");
    }
  };

  const handleUpdateButtonClick = async () => {
    history.push(
      (window.location.href = `/home/teams/${teamId}/player/${playerId}/update-player`)
    );
  };

  const handleLogOut = () => {
    googleLogout();
    window.location.href = "/";
  };

  return (
    <>
      <GlobalStyle />
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={disabled} />
          {disabled ? (
            <LogOutContainer onClick={handleLogOut}>
              <StyledIonIcon icon={logOut} color="primary" />
            </LogOutContainer>
          ) : (
            <>
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
              <Margin />
            </>
          )}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="¿Estás seguro de que quieres eliminar a este jugador?"
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  history.push(
                    (window.location.href = `/home/teams/${teamId}/player/${playerId}`)
                  );
                },
              },
              {
                text: "Eliminar",
                role: "confirm",
                handler: () => {
                  handleDeletePlayer();
                  history.push(
                    (window.location.href = `/home/teams/${teamId}`)
                  );
                },
              },
            ]}
          />
          <ImageContainer>
            <Image
              src={
                player && player.imageUrl
                  ? player.imageUrl
                  : "https://ionicframework.com/docs/img/demos/avatar.svg"
              }
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
                <IonLabel>{player ? player.telephone : ""}</IonLabel>
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
              {player
                ? player.improvements !== ""
                  ? player.improvements
                  : "No hay ninguna mejora asignada"
                : ""}
            </ImprovementsContainer>
          </IonList>{" "}
          <Space />
          <Card
            route={`/home/teams/${teamId}/player/${playerId}/diet`}
            title="Alimentación"
            imageUrl="../../assets/images/diet.png"
            description=""
          />
          <Card
            route={`/home/teams/${teamId}/player/${playerId}/training`}
            title="Entrenamientos personalizados"
            imageUrl="../../assets/images/training.png"
            description="Estiramientos y ejercicios adicionales para mejorar el rendimiento y fortalecer lesiones"
          />
        </IonContent>
        <IonFooter>
          <Tabs disabled={disabled} />
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
  --color: var(--ion-color-primary);

  &[activated] {
    --color: var(--ion-color-primary);
  }
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

const GlobalStyle = createGlobalStyle`
    :root {
      --ion-color-primary: #1f7189;
    }
  `;

const LogOutContainer = styled.div`
  text-align: right;
`;

const StyledIonIcon = styled(IonIcon)`
  font-size: 250%;
  margin: 1%;
`;

export default PlayerInfo;
