import {
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
  } from "@ionic/react";
import Button from "frontend/src/components/button/button";
  import Menu from "frontend/src/components/menu/menu";
  import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";

const Diet = () => {
  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <ButtonContainer>
            <Button color="primary" icon={addCircleOutline} text="Añadir dieta" />
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const ButtonContainer = styled.div`
  margin-top: 10%;
  margin-left: 24%;
  width: 50%;
`;

export default Diet;
