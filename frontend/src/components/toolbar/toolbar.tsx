import {
  IonButtons,
  IonImg,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";

const ToolBar = () => {
  return (
    <>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton color="light"></IonMenuButton>
        </IonButtons>
        <TitleContainer>
          <IonTitle>TouchSports</IonTitle>
        </TitleContainer>
        <LogoImage
          slot="end"
          src={require("../../assets/images/toolbar-image.png")}
        />
      </IonToolbar>
    </>
  );
};

const TitleContainer = styled.div`
  text-align: center;
  align-items: center;
`;

const LogoImage = styled(IonImg)`
  width: 10%;
  height: 10%;
  margin-right: 2%;
`;

export default ToolBar;
