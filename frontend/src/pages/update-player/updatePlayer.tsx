import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonList,
  IonPage,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useEffect, useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Avatar from "frontend/src/components/avatar/avatar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

interface RouteParams {
  teamId: string;
  playerId: string;
}

const UpdatePlayer = () => {
  const { teamId } = useParams<RouteParams>();
  const { playerId } = useParams<RouteParams>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchPlayerData = async () => {
      const existingPlayer = await api.getPlayerById(
        payload.sub,
        teamId,
        playerId
      );
      if (existingPlayer && existingPlayer.player) {
        setName(existingPlayer.player.name || "");
        setSurname(existingPlayer.player.surname || "");
        setEmail(existingPlayer.player.email || "");
      }
    };

    fetchPlayerData();
  }, [payload.sub, teamId, playerId]);

  const handleUpdatePlayer = async () => {
    await api.updatePlayer(payload.sub, teamId, playerId, name, surname, email);
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu />
          <PersonContainer>
            <Avatar
              route=""
              imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
              name=""
              surname=""
            />
          </PersonContainer>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
              <br />
              <Input
                label="Apellidos"
                placeholder="Apellidos"
                elements={(surname) => setSurname(surname)}
                value={surname}
              />
              <br />
              <Input
                label="Teléfono"
                placeholder="Teléfono"
                elements={(telephoneNumber) =>
                  setTelephoneNumber(telephoneNumber)
                }
                value={telephoneNumber}
              />
              <br />
              <Input
                label="Correo"
                placeholder="Correo"
                elements={(email) => setEmail(email)}
                value={email}
              />
            </Margin>
          </IonList>
          <Space />
          <Button>
            <AddButton id="open-action-sheet">Actualizar</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push(`/home/teams/${teamId}`),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdatePlayer();
                    history.push(`/home/teams/${teamId}`);
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () =>
                    history.push(
                      `/home/teams/${teamId}/player/${playerId}/update-player`
                    ),
                },
              ]}
            ></IonActionSheet>
          </Button>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const PersonContainer = styled.div`
  margin-bottom: 10%;
  margin-left: 34%;
`;

const Margin = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

const Button = styled.div`
  text-align: center;
  align-items: center;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const AddButton = styled(IonButton)`
  width: 30%;
`;

export default UpdatePlayer;
