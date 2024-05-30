import {
  IonAlert,
  IonContent,
  IonFabButton,
  IonFooter,
  IonHeader,
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
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [trainer, setTrainer] = useState<Trainer>();
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));
  const picture = payload.picture;

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const result = await api.getTrainerById(payload.sub);
        setTrainer(result.trainer);
      } catch (error) {
        console.error("Error al obtener el entrenador:", error);
      }
    };
    fetchTrainer();
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false}/>
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
              <IonLabel>Correo</IonLabel>
              <MarginList>
                <IonLabel>{trainer ? trainer.email : ""}</IonLabel>
              </MarginList>
            </IonItem>
          </IonList>
          <Space />
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
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

export default Profile;
