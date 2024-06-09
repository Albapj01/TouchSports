import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";
import styled from "styled-components";
import Avatar from "frontend/src/components/avatar/avatar";
import Tabs from "frontend/src/components/tabs/tabs";
import Menu from "frontend/src/components/menu/menu";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Button from "frontend/src/components/button/button";
import { personAdd } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Player } from "frontend/src/utils/interfaces/Player";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { useEffect, useState } from "react";
import api from "frontend/src/utils/api/api";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";

const Team = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const [players, setPlayers] = useState<Player[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (teamId) {
      const fetchPlayers = async () => {
        try {
          const result = await api.getAllPlayers(payload.sub, teamId);
          setPlayers(result.players);
        } catch (error) {
          console.error("Error al obtener jugadores:", error);
        }
      };
      fetchPlayers();
    } else {
      console.error("El equipo no existe.");
    }
  }, []);

  const handleDeleteButtonClick = () => {
    setShowAlert(true);
  };

  const handleDeleteTeam = async () => {
    if (teamId) {
      await api.deleteTeam(payload.sub, teamId);
    } else {
      console.error("El equipo no existe.");
    }
  };

  const handleUpdateButtonClick = () => {
    history.push(window.location.href =`/home/teams/${teamId}/update-team`);
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false} />
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
            header="¿Estás seguro de que quieres eliminar el equipo?"
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  history.push(window.location.href=`/home/teams/${teamId}`);
                },
              },
              {
                text: "Eliminar",
                role: "confirm",
                handler: () => {
                  handleDeleteTeam();
                  history.push(window.location.href=`/home/teams`);
                },
              },
            ]}
          />
          <br />
          <PersonsContainer>
            {players &&
              players.map((player) => (
                <Person key={player.playerId}>
                  <AvatarContainer>
                    <Avatar
                      route={`/home/teams/${teamId}/player/${player.playerId}`}
                      imageUrl={player && player.imageUrl ? player.imageUrl : "https://ionicframework.com/docs/img/demos/avatar.svg"}
                      name={player.name}
                      surname={player.surname}
                    />
                  </AvatarContainer>
                </Person>
              ))}
          </PersonsContainer>
          <Space />
          <ButtonContainer>
            <Button
              onClick={() => {
                window.location.href = `/home/teams/${teamId}/add-player`;
              }}
              color="primary"
              icon={personAdd}
              text="Añadir jugador"
            />
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false} />
        </IonFooter>
      </IonPage>
    </>
  );
};

const PersonsContainer = styled.div`
  display: grid;
  justify-content: space-around;
  margin: 8%;
  grid-template-columns: repeat(2, 1fr);
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

const Person = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15%;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const AvatarContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default Team;