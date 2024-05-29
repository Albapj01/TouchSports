import { IonContent, IonFooter, IonImg, IonList, IonPage } from "@ionic/react";
import Logo from "frontend/src/components/logo/logo";
import styled, { createGlobalStyle } from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "../../utils/api/api";
import Button from "frontend/src/components/button/button";
import { personOutline, peopleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import Input from "frontend/src/components/input/input";
import { Trainer } from "frontend/src/utils/interfaces/Trainer";
import { Player } from "frontend/src/utils/interfaces/Player";

const SignIn = () => {
  const history = useHistory();
  const [selectedRole, setSelectedRole] = useState<String | null>(null);
  const [email, setEmail] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [player, setPlayer] = useState<Player>();

  const trainerResponse = async (credentialResponse: any) => {
    storage.set("token", credentialResponse.credential!);

    const { payload } = decodeJwt(storage.get("token"));

    try {
      const existingTrainer = await api.getTrainerById(payload.sub);
      if (!existingTrainer) {
        await api.createTrainer(
          payload.sub,
          payload.given_name,
          payload.family_name,
          payload.email,
          "",
          [],
          "",
          []
        );
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        await api.createTrainer(
          payload.sub,
          payload.given_name,
          payload.family_name,
          payload.email,
          "",
          [],
          "",
          []
        );
      } else {
        console.error("Error handling trainer response:", error);
      }
    }

    history.push("/");
  };

  const playerResponse = async (credentialResponse: any) => {
    try {
      storage.set("token", credentialResponse.credential!);

      const { payload } = decodeJwt(storage.get("token"));

      const result = await api.getPlayerByEmail(email, payload.email);
      setPlayer(result.player);

      if (!player) {
        return null;
      }

      const updatedPlayer = await api.updatePlayer(
        player.trainerId,
        player.teamId,
        player.playerId,
        player.name,
        player.surname,
        player.email,
        payload.picture,
        player.diet,
        player.technicalTraining,
        player.physicalTraining,
        player.improvements
      );

      localStorage.setItem("trainerId", player.trainerId);

      history.push(`/home/teams/${player?.teamId}/player/${player?.playerId}`);
    } catch (error) {
      console.error("Error handling player response:", error);
    }
  };

  const error = () => {
    console.log("Login Failed, please try again with another account");
  };

  const handleRoleSelection = (role: String) => {
    setSelectedRole(role);
  };

  return (
    <>
      <GlobalStyle />
      <IonPage>
        <IonContent fullscreen>
          <BackgroundContainer>
            <BackgroundImage src={require("../../assets/images/fondo.jpeg")} />
          </BackgroundContainer>
          <ContentContainer>
            <SignInContainer>
              <Logo />
              <Space></Space>
              {!selectedRole && (
                <>
                  <Button
                    color="primary"
                    icon={personOutline}
                    text="Entrenador"
                    onClick={() => handleRoleSelection("entrenador")}
                  />
                  <Button
                    color="primary"
                    icon={peopleOutline}
                    text="Jugador"
                    onClick={() => handleRoleSelection("jugador")}
                  />
                </>
              )}
              {selectedRole === "entrenador" && (
                <StyledButton>
                  <GoogleLogin onSuccess={trainerResponse} onError={error} />
                </StyledButton>
              )}
              {selectedRole === "jugador" && (
                <>
                  <IonList>
                    <InputContainer>
                      <Input
                        label="Correo del entrenador"
                        placeholder="Correo del entrenador"
                        elements={(email) => setEmail(email)}
                        value={email}
                      />
                    </InputContainer>
                  </IonList>
                  <br></br>
                  <StyledButton>
                    <GoogleLogin onSuccess={playerResponse} onError={error} />
                  </StyledButton>
                </>
              )}
            </SignInContainer>
          </ContentContainer>
        </IonContent>
        <IonFooter></IonFooter>
      </IonPage>
    </>
  );
};

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const BackgroundImage = styled(IonImg)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentContainer = styled.div`
  text-align: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const SignInContainer = styled.div`
  text-align: center;
  align-items: center;
`;

const StyledButton = styled.div`
  border-radius: 15px;
  box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  margin-bottom: 3%;
`;

const Space = styled.div`
  margin-bottom: 30%;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
    :root {
      --ion-color-primary: #1f7189;
    }

    .no-margin-padding {
      margin: 0 !important;
      padding: 0 !important;
    }

    ion-item {
      border-color: white !important;
    }

  `;

export default SignIn;
