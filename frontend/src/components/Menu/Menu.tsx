import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";
import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

const Menu: React.FC = () => {
  const [showDropDown, setDropDown] = useState(false);

  const handleDropDownClick = (e: React.MouseEvent) => {
    setDropDown(!showDropDown);
  };

  return (
    <>
      <GlobalStyle />
      <IonMenu contentId="main-content">
        <IonContent>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
          <IonItem>Calendario</IonItem>
          <IonItem button onClick={handleDropDownClick}>
            Equipo
          </IonItem>
          {showDropDown && (
            <IonList>
              <IonItem>Equipo 1</IonItem>
              <IonItem>Equipo 2</IonItem>
            </IonList>
          )}
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
