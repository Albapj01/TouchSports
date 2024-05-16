import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
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
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import { Centres } from "frontend/src/utils/interfaces/Centres";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { fileTrayFull } from "ionicons/icons";

interface RouteParams {
  centresId: string;
}

const CentreInfo = () => {
  const { centresId } = useParams<RouteParams>();
  const [centres, setCentres] = useState<Centres>();

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api
      .getCentresById(payload.sub, centresId)
      .then((result) => setCentres(result.centres));
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Margin />
          <ImageContainer>
            <Image
              src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
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
            <Link to={`/home/centres/${centresId}/reserve`}>
              <Button color="primary" icon={fileTrayFull} text="Realizar reserva" />
            </Link>
          </ButtonContainer>
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

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

export default CentreInfo;
