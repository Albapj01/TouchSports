import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import api from "frontend/src/utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { Player } from "frontend/src/utils/interfaces/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Training = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player>();
  const [trainerId, setTrainerId] = useState("");

  const { payload } = decodeJwt(storage.get("token"));

  const technicalTrainingItems = player?.technicalTraining.split(",") || [];
  const physicalTrainingItems = player?.physicalTraining.split(",") || [];

  useEffect(() => {
    if (teamId && playerId) {
      const fetchPlayerData = async () => {
        try {
          const storedTrainerId = localStorage.getItem("trainerId");
          if (!storedTrainerId) {
            return null;
          }

          setTrainerId(storedTrainerId);
          let result;
          if (storedTrainerId) {
            result = await api.getPlayerById(storedTrainerId, teamId, playerId);
          } else {
            result = await api.getPlayerById(payload.sub, teamId, playerId);
          }

          setPlayer(result.player);
        } catch (error) {
          console.error("Error al obtener el jugador:", error);
        }
      };
      fetchPlayerData();
    } else {
      console.error("El jugador no existe.");
    }
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Container>
            <TextContainer>
              <IonText>Entrenamientos personalizados</IonText>
            </TextContainer>
            <Space></Space>
            <TextStyles>
              Para mejorar la técnica, durante los entrenos o en sus ratos
              libres, se debe de enfocar en la realización de:
              <br></br>
              {technicalTrainingItems.map((item, index) => (
                <div key={index}>- {item.trim()}</div>
              ))}{" "}
              <Space></Space>
              Para mejorar el físico y la resistencia, durante los entrenos o en
              sus ratos libres, se debe de enfocar en la realización de:
              {physicalTrainingItems.map((item, index) => (
                <div key={index}>- {item.trim()}</div>
              ))}{" "}
            </TextStyles>
          </Container>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Container = styled.div`
  margin: 6%;
`;

const TextContainer = styled.div`
  text-align: center;
  color: #1f7189;
  margin-top: 5%;
  font-size: 25px;
  font-weight: bold;
`;

const Space = styled.div`
  margin-top: 10%;
`;

const TextStyles = styled.div`
  font-size: 20px;
`;

export default Training;
