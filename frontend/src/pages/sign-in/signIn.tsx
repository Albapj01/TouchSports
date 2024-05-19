import { IonContent, IonFooter, IonImg, IonPage } from "@ionic/react";
import Logo from "frontend/src/components/logo/logo";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "../../utils/api/api";

const SignIn = () => {
  const history = useHistory();

  const response = async (credentialResponse: any) => {
    storage.set("token", credentialResponse.credential!);

    const { payload } = decodeJwt(storage.get("token"));

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

    history.push("/");
  };

  const error = () => {
    console.log("Login Failed, please try again with another account");
  };

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <BackgroundContainer>
            <BackgroundImage src={require("../../assets/images/fondo.jpeg")} />
          </BackgroundContainer>
          <ContentContainer>
            <SignInContainer>
              <Logo />
              <Space></Space>
              <StyledButton>
                <GoogleLogin onSuccess={response} onError={error} />
              </StyledButton>
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

export default SignIn;
