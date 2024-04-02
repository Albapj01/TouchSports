import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import styled from "styled-components";
import Avatar from "frontend/src/components/avatar/avatar";
import Tabs from "frontend/src/components/tabs/tabs";
import Menu from "frontend/src/components/menu/menu";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Button from "frontend/src/components/button/button";
import { personAdd } from "ionicons/icons";
import { Link } from "react-router-dom"; 

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
                route="/home/team/player"
                imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
                name="Nombre Apellidos"
              />
            </Person>
            <Person>
              <Avatar
                route="/home/team/player"
                imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
                name="Nombre Apellidos"
              />
            </Person>
          </PersonsContainer>
          <Space />
          <ButtonContainer>
            <Link to="/home/team/add-player">
              <Button color="primary" icon={personAdd} text="Añadir jugador" />
            </Link>
          </ButtonContainer>
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

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

const Person = styled.div`
  flex-direction: row;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

export default Team;
