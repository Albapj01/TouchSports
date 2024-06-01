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

const AddCentres = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const { payload } = decodeJwt(storage.get("token"));

  const handleAddCentres = async () => {
    if (name == "" || location == "") {
      setShowAlert(true);
      return;
    }

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
    history.push(window.location.href="/home/centres");
  };

  const handleImageUrl = (centreName: string) => {
    if (centreName.toLowerCase().includes("palacio")) {
      return "https://upload.wikimedia.org/wikipedia/commons/e/e8/Palacio_Municipal_de_Deportes_Vista_Alegre_-_C%C3%B3rdoba_%28Espa%C3%B1a%29.jpg"; 
    } else if (centreName.toLowerCase().includes("pidal")) {
      return "https://www.uco.es/empresa/ucodeporte/wp-content/uploads/slider_01_ucodeporte_pabellon.jpg"; 
    } 
    return "https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp";
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu disabled={false}/>
          <ImageContainer>
            <IonImg
              src={handleImageUrl(name)}
            />
          </ImageContainer>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre (Obligatorio)"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
              <br />
              <Input
                label="Ubicación (Obligatorio)"
                placeholder="Ubicación"
                elements={(location) => setLocation(location)}
                value={location}
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
                  handler: () => history.push(window.location.href="/home/centres"),
                },
                {
                  text: "Añadir",
                  handler: () => {
                    handleAddCentres();
                  },
                },
                {
                  text: "Seguir editando",
                  role: "cancel",
                  handler: () => history.push("/home/centres/add-centres"),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message="El nombre y la ubicación son obligatorios"
            buttons={["OK"]}
          />
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const ImageContainer = styled.div`
  text-align: center;
  align-items: center;
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

export default AddCentres;