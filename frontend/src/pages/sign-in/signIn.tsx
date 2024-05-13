import { IonContent, IonFooter, IonImg, IonPage } from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Logo from "frontend/src/components/logo/logo";
import { logoGoogle, logoFacebook, logoApple } from "ionicons/icons";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";

const SignInSecond = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
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
              <Button
                color="light"
                icon={logoGoogle}
                text="Sign in with Google"
              />
              <GoogleLogin onSuccess={responseMessage}/>
              <br></br>
              <Button
                color="primary"
                icon={logoFacebook}
                text="Sign in with Facebook"
              />
              <br></br>
              <Button color="dark" icon={logoApple} text="Sign in with Apple" />
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
  height: 100vh; /* Usar 100vh para ocupar el 100% de la altura de la ventana */
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

export default SignInSecond;
