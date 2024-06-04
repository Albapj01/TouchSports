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
import { useEffect, useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import api from "../../utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";

const UpdateCentre = () => {
  const { centresId } = useParams<{ centresId: string }>();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (centresId) {
      const fetchCentreData = async () => {
        try {
          const existingCentre = await api.getCentresById(
            payload.sub,
            centresId
          );
          if (existingCentre && existingCentre.centres) {
            setName(existingCentre.centres.name || "");
            setLocation(existingCentre.centres.location || "");
          }
        } catch (error) {
          console.error("Error al obtener el centro:", error);
        }
      };

      fetchCentreData();
    } else {
      console.error("El centro no existe.");
    }
  }, [payload.sub, centresId]);

  const handleUpdateCentre = async () => {
    if (name == "" || location == "") {
      setShowAlert(true);
      return;
    }

    if (centresId) {
      await api.updateCentre(payload.sub, centresId, name, location);
    } else {
      console.error("El centro no existe.");
    }
    history.push(window.location.href="/");
  };

  const handleImageUrl = (centreName: string) => {
    if (centreName.toLowerCase().includes("palacio")) {
      return "../../assets/images/va.png"; 
    } else if (centreName.toLowerCase().includes("pidal")) {
      return "../../assets/images/pidal.png"; 
    } 
    return "../../assets/images/centre.png";
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
            <AddButton id="open-action-sheet">Actualizar</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push(window.location.href="/home/centres"),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateCentre();
                  },
                },
                {
                  text: "Seguir editando",
                  role: "cancel",
                  handler: () =>
                    history.push(`/home/centres/${centresId}/update-centre`),
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

export default UpdateCentre;