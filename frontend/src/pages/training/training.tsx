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
import styled, { createGlobalStyle } from "styled-components";

const Training = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player>();
  const [trainerId, setTrainerId] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { payload } = decodeJwt(storage.get("token"));

  const technicalTrainingItems = player?.technicalTraining.split(",") || [];
  const physicalTrainingItems = player?.physicalTraining.split(",") || [];

  useEffect(() => {
    if (teamId && playerId) {
      const fetchPlayerData = async () => {
        try {
          const storedTrainerId = localStorage.getItem("trainerId");

          let result;

          if (storedTrainerId && storedTrainerId !== payload.sub) {
            setTrainerId(storedTrainerId);
            result = await api.getPlayerById(storedTrainerId, teamId, playerId);
            setDisabled(true);
          } else {
            result = await api.getPlayerById(payload.sub, teamId, playerId);
            setDisabled(false);
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

  const showPhysicalImages = () => {
    return {
      flexiones: physicalTrainingItems.some(
        (item) => item.trim().toLowerCase() === "flexiones"
      ),
      abdominales: physicalTrainingItems.some(
        (item) => item.trim().toLowerCase() === "abdominales"
      ),
      sentadillas: physicalTrainingItems.some(
        (item) => item.trim().toLowerCase() === "sentadillas"
      ),
    };
  };

  const physicalImages = showPhysicalImages();

  return (
    <>
      <GlobalStyle />
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={disabled} />
          <Container>
            <TextContainer>
              <IonText>Entrenamientos personalizados</IonText>
            </TextContainer>
            <Space></Space>
            <TextStyles>
              {player?.technicalTraining !== "" ? (
                <>
                  Para mejorar la técnica, durante los entrenos o en sus ratos
                  libres, se debe de enfocar en la realización de:
                  <br />
                  {technicalTrainingItems.map((item, index) => (
                    <div key={index}>- {item.trim()}</div>
                  ))}
                </>
              ) : (
                "No tienes ningún entrenamiento técnico asignado."
              )}
              <Space></Space>
              {player?.physicalTraining !== "" ? (
                <>
                  Para mejorar el físico y la resistencia, durante los entrenos
                  o en sus ratos libres, se debe de enfocar en la realización
                  de:
                  {physicalTrainingItems.map((item, index) => (
                    <div key={index}>
                      - {item.trim()}
                      {item.trim().toLowerCase() === "flexiones" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/push-ups.png"
                            alt="Flexiones"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "abdominales" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/abs.png"
                            alt="Abdominales"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "sentadillas" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/squats.png"
                            alt="Sentadillas"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "carrera continua" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/continuous-run.png"
                            alt="Carrera Continua"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "sprints" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/sprint.png"
                            alt="Sprints"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "pesas" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/dumbbells.png"
                            alt="Pesas"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "planchas" && (
                        <ImageContainer>
                          <img
                            src="../../assets/images/plank.png"
                            alt="Planchas"
                          />
                        </ImageContainer>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                "No tienes ningún entrenamiento físico asignado."
              )}
            </TextStyles>
          </Container>
        </IonContent>
        <IonFooter>
          <Tabs disabled={disabled} />
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

const ImageContainer = styled.div`
  text-align: center;
  align-items: center;
  margin: 10%;
`;

const Space = styled.div`
  margin-top: 10%;
`;

const TextStyles = styled.div`
  font-size: 20px;
`;

const GlobalStyle = createGlobalStyle`
    :root {
      --ion-color-primary: #1f7189;
    }
  `;

export default Training;
