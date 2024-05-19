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
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { Trainer } from "frontend/src/utils/interfaces/Trainer";
import { useEffect, useState } from "react";
import api from "frontend/src/utils/api/api";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [trainer, setTrainer] = useState<Trainer>();
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));
  const picture = payload.picture;

  useEffect(() => {
    api
      .getTrainerById(payload.sub)
      .then((result) => setTrainer(result.trainer));
  }, []);

  const handleDeleteButtonClick = () => {
    setShowAlert(true);
  };

  const handleUpdateButtonClick = async () => {
    // history.push(`/home/profile/${trainer?.trainerId}/update-trainer`);
    history.push(`/home/profile`);
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
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
            header="¿Estás seguro de que quieres eliminar el entrenador?"
            buttons={[
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  history.push(`/home/profile`);
                },
              },
              {
                text: "Eliminar",
                role: "confirm",
                handler: () => {
                  history.push(`/home/profile`);
                },
              },
            ]}
          />
          <Margin />
          <ImageContainer>
            <Image src={picture} />
          </ImageContainer>
          <IonList inset={true}>
            <IonItem color="light">
              <IonLabel>Nombre</IonLabel>
              <MarginList>
                <IonLabel>{trainer ? trainer.name : ""}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Apellidos</IonLabel>
              <MarginList>
                <IonLabel>{trainer ? trainer.surname : ""}</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Teléfono</IonLabel>
              <MarginList>
                <IonLabel>Example</IonLabel>
              </MarginList>
            </IonItem>
            <IonItem color="light">
              <IonLabel>Correo</IonLabel>
              <MarginList>
                <IonLabel>{trainer ? trainer.email : ""}</IonLabel>
              </MarginList>
            </IonItem>
          </IonList>
          <Space />
        </IonContent>
        <IonFooter>
          <Tabs />
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
`;

export default Profile;
