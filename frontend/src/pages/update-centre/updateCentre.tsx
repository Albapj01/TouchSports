import {
  IonActionSheet,
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
import Avatar from "frontend/src/components/avatar/avatar";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import api from "../../utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";

const UpdateCentre = () => {
  const { centresId } = useParams<{ centresId: string }>();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

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
    if (centresId) {
      await api.updateCentre(payload.sub, centresId, name, location);
    } else {
      console.error("El centro no existe.");
    }
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
                label="Nombre"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
              <br />
              <Input
                label="Ubicación"
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
                  handler: () => history.push("/home/centres"),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateCentre();
                    history.push("");
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () =>
                    history.push(`/home/centres/${centresId}/update-centre`),
                },
              ]}
            ></IonActionSheet>
          </Button>
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
