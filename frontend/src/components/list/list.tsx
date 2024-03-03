import { IonContent, IonItem, IonLabel, IonList } from "@ionic/react";
import styled, { createGlobalStyle } from "styled-components";

const List = () => {
  return (
    <IonList inset={true}>
      <IonItem color="light">
        <IonLabel>Name</IonLabel>
        <Margin>
          <IonLabel>Example</IonLabel>
        </Margin>
      </IonItem>
      <IonItem color="light">
        <IonLabel>Apellidos</IonLabel>
        <Margin>
          <IonLabel>Example</IonLabel>
        </Margin>
      </IonItem>
      <IonItem color="light">
        <IonLabel>Correo</IonLabel>
        <Margin>
          <IonLabel>Example</IonLabel>
        </Margin>
      </IonItem>
      <IonItem color="light">
        <IonLabel>Teléfono</IonLabel>
        <Margin>
          <IonLabel>Example</IonLabel>
        </Margin>
      </IonItem>
    </IonList>
  );
};

const Margin = styled.div`
  margin-right: auto;
`;

export default List;
