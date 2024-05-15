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
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Avatar from "frontend/src/components/avatar/avatar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import api from "../../utils/api/api";
import { v4 as uuidv4 } from "uuid";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";

const AddCentres = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  const handleAddCentres = async () => {
    const id = uuidv4();
    const centresId = id.toString();

    const existingCentres = await api.getCentresById(payload.sub, centresId);
    const obtainedCentresId =
      existingCentres && existingCentres.centres
        ? existingCentres.centres.id
        : null;

    if (!obtainedCentresId) {
      await api.createCentres(payload.sub, centresId, name, location, [], "");
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
              />
              <br />
              <Input
                label="Ubicación"
                placeholder="Ubicación"
                elements={(location) => setLocation(location)}
              />
              <br />
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
                  handler: () => history.push("/home/centres"),
                },
                {
                  text: "Añadir",
                  handler: () => {
                    handleAddCentres();
                    history.push("");
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push("/home/centres/add-centres"),
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

export default AddCentres;
