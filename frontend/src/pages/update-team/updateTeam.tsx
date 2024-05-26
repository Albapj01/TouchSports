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
import { useHistory, useParams } from "react-router-dom";
import api from "../../utils/api/api";
import { v4 as uuidv4 } from "uuid";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";

const UpdateTeam = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [name, setName] = useState("");
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (teamId) {
      const fetchTeamData = async () => {
        try {
          const response = await api.getTeamById(payload.sub, teamId);
          const existingTeam = response.json();
          if (existingTeam && existingTeam.team) {
            setName(existingTeam.team.name || "");
          }
        } catch (error) {
          console.error("Error al obtener datos del equipo:", error);
        }
      };

      fetchTeamData();
    } else {
      console.error("El equipo no existe.");
    }
  }, [payload.sub, teamId]);

  const handleUpdateTeam = async () => {
    if (teamId) {
      await api.updateTeam(payload.sub, teamId, name);
    } else {
      console.error("El equipo no existe.");
    }
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
                  handler: () => history.push("/home/teams"),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateTeam();
                    history.push("");
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push(`/home/teams/${teamId}/update-team`),
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

export default UpdateTeam;
