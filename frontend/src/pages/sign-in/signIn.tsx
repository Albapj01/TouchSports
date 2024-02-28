import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Logo from "frontend/src/components/logo/logo";
import { logoGoogle, logoFacebook, logoApple } from "ionicons/icons";
import styled from "styled-components";

const SignIn = () => {
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar></IonToolbar>
          </IonHeader>
          <Logo />
          <SignInContainer>
            <Button
              color="light"
              icon={logoGoogle}
              text="Sign in with Google"
            />
            <br></br>
            <Button
              color="primary"
              icon={logoFacebook}
              text="Sign in with Facebook"
            />
            <br></br>
            <Button color="dark" icon={logoApple} text="Sign in with Apple" />
          </SignInContainer>
          <IonImg src={require("../../assets/images/fondo.png")} />
        </IonContent>
        <IonFooter></IonFooter>
      </IonPage>
    </>
  );
};

const SignInContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-bottom: 10%;
`;

export default SignIn;
