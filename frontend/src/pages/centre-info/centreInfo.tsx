import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import api from "frontend/src/utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { Centres } from "frontend/src/utils/interfaces/Centres";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { fileTrayFull } from "ionicons/icons";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";

const CentreInfo = () => {
  const { centresId } = useParams<{ centresId: string }>();
  const [centres, setCentres] = useState<Centres>();
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (centresId) {
      const fetchCentresById = async () => {
        try {
          const result = await api.getCentresById(payload.sub, centresId);
          setCentres(result.centres);
        } catch (error) {
          console.error("Error al obtener el centro por ID:", error);
        }
      };
      fetchCentresById();
    } else {
      console.error("El centro no existe.");
    }
  }, []);

  const handleDeleteButtonClick = () => {
    setShowAlert(true);
  };

  const handleDeleteCentre = async () => {
    if (centresId) {
      await api.deleteCentre(payload.sub, centresId);
    } else {
      console.error("El centro no existe.");
    }
  };

  const handleUpdateButtonClick = async () => {
    history.push(window.location.href =`/home/centres/${centresId}/update-centre`);
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
            header="¿Estás seguro de que quieres eliminar el centro?"
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  history.push(window.location.href=`/home/centres/${centresId}`);
                },
              },
              {
                text: "Eliminar",
                role: "confirm",
                handler: () => {
                  handleDeleteCentre();
                  history.push(window.location.href=`/home/centres`);
                },
              },
            ]}
          />
          <Margin />
          <ImageContainer>
            <IonImg
              src={handleImageUrl(centres ? centres.name : "")}
            />
          </ImageContainer>
          <IonList inset={true}>
            <IonItem color="light">
              <IonLabel>Nombre</IonLabel>
              <MarginList>
                <IonLabel>{centres ? centres.name : ""}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Ubicación</IonLabel>
              <MarginList>
                <IonLabel>{centres ? centres.location : ""}</IonLabel>
              </MarginList>
            </IonItem>
          </IonList>
          <ButtonContainer>
            <Button
              onClick={() => {
                window.location.href = `/home/centres/${centresId}/reserve`;
              }}
              color="primary"
              icon={fileTrayFull}
              text="Realizar reserva"
            />
          </ButtonContainer>
          <Space />
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
  align-items: center;
  margin: 10%;
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

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
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

export default CentreInfo;
