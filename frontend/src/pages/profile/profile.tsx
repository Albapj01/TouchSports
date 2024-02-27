import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import List from "frontend/src/components/list/list";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import styled from "styled-components";

const Profile = () => {
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar color="primary"></IonToolbar>
          </IonHeader>
          <Menu />
          <Margin />
          <ImageContainer>
            <Image
              src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
            />
          </ImageContainer>
          <List />
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Image = styled.img`
  border-radius: 50%;
  width: 40%;
`;

const ImageContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-bottom: 10%;
`;

const Margin = styled.div`
  margin-top: 15%;
`;

export default Profile;