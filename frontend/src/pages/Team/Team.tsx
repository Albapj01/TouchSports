import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import styled from "styled-components";
import Avatar from "frontend/src/components/avatar/avatar";
import Tabs from "frontend/src/components/tabs/tabs";
import Menu from "frontend/src/components/menu/menu";
import ToolBar from "frontend/src/components/toolbar/toolbar";

const Team = () => {
  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <PersonsContainer>
            <Person>
              <Avatar
                imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
                name="Nombre Apellidos"
              />
            </Person>
            <Person>
              <Avatar
                imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
                name="Nombre Apellidos"
              />
            </Person>
          </PersonsContainer>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const PersonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8%;
`;

const Person = styled.div`
  flex-direction: row;
`;

export default Team;
