import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import api from "../../utils/api/api";
import { v4 as uuidv4 } from "uuid";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";

const AddTeam = () => {
  const [name, setName] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const { payload } = decodeJwt(storage.get("token"));

  const handleAddTeam = async () => {
    if (name == "") {
      setShowAlert(true);
      return;
    }
    
    const id = uuidv4();
    const teamId = id.toString();

    const existingTeam = await api.getTeamById(payload.sub, teamId);
    const obtainedTeamId =
      existingTeam && existingTeam.team ? existingTeam.team.id : null;

    if (!obtainedTeamId) {
      await api.createTeam(payload.sub, teamId, name, []);
    }
    history.push((window.location.href = "/home/teams"));
  };

  const handleImageUrl = (teamName: string) => {
    if (teamName.toLowerCase().includes("baloncesto")) {
      return "../../assets/images/basketball.png"; 
    } else if (teamName.toLowerCase().includes("futbol") || teamName.toLowerCase().includes("fútbol")) {
      return "../../assets/images/soccer.png"; 
    } else if (teamName.toLowerCase().includes("balonmano")) {
      return "../../assets/images/handball.png"; 
    } else if(teamName.toLowerCase().includes("volley") || teamName.toLowerCase().includes("voleibol")){
      return "../../assets/images/volleyball.png"
    }
    return "../../assets/images/team.png"; 
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu disabled={false} />
          <ImageContainer>
            <IonImg src={handleImageUrl(name)} />
          </ImageContainer>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre (Obligatorio)"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
            </Margin>
          </IonList>
          <Space />
          <Button>
            <AddButton id="open-action-sheet">Añadir</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () =>
                    history.push((window.location.href = "/home/teams")),
                },
                {
                  text: "Añadir",
                  handler: () => {
                    handleAddTeam();
                  },
                },
                {
                  text: "Seguir editando",
                  role: "cancel",
                  handler: () => history.push("/home/teams/add-team"),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message="El nombre es obligatorio"
            buttons={["OK"]}
          />
        </IonContent>
        <IonFooter>
          <Tabs disabled={false} />
        </IonFooter>
      </IonPage>
    </>
  );
};

const ImageContainer = styled.div`
  text-align: center;
  margin: 10%;
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

export default AddTeam;

