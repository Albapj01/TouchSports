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
                "No tienes ningún entrenamiento técnico asignado"
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
                            src="https://media.vogue.es/photos/621771ace529511d4af263e5/master/w_1600%2Cc_limit/tabla-de-ejercicios4-1.jpeg"
                            alt="Flexiones"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "abdominales" && (
                        <ImageContainer>
                          <img
                            src="https://www.clikisalud.net/wp-content/uploads/2023/07/pasos-musculos-abdominales-fuertes.jpg"
                            alt="Abdominales"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "sentadillas" && (
                        <ImageContainer>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/008/635/575/non_2x/woman-doing-bodyweight-squats-exercise-flat-illustration-isolated-on-white-background-vector.jpg"
                            alt="Sentadillas"
                          />
                        </ImageContainer>
                      )}
                      {item.trim().toLowerCase() === "carrera continua" && (
                        <ImageContainer>
                          <img
                            src="https://img.freepik.com/vector-premium/correr-joven-prepara-carrera-velocidad-concepto-entrenamiento-deportivo-ilustracion-vectorial_533410-414.jpg"
                            alt="Carrera Continua"
                          />
                        </ImageContainer>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                "No tienes ningún entrenamiento físico asignado"
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
