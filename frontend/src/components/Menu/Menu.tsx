import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const Menu: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <IonMenu contentId="main-content">
        <IonContent>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
          <IonItem>Calendario</IonItem>
          <IonItem slot="header">
            Equipo
            <div>
              <IonItem>
                <IonLabel>Equipo 1</IonLabel>
              </IonItem>
            </div>
          </IonItem>
          <IonItem>Instalaciones</IonItem>
          <IonItem>Cerrar Sesión</IonItem>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <GlobalStyle />
        <IonHeader color="primary">
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton color="light"></IonMenuButton>
            </IonButtons>
            <IonTitle>TouchSports</IonTitle>
            <IonButtons slot="end" style={{ marginRight: "8px" }}>
              <IonIcon slot="icon-only" icon={person} color="light"></IonIcon>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
    :root {
      --ion-color-primary: #1f7189;
    }
  `;

export default Menu;
