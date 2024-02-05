import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import styled from "styled-components";
import Avatar from "frontend/src/components/Avatar/Avatar";

const Team: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar></IonToolbar>
          </IonHeader>
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
