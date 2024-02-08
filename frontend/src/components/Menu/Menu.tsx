import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRadio,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { person } from "ionicons/icons";

const Menu = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
          <IonItemGroup>
            <IonRadio value="Calendario">
              <code>Calendario</code>
            </IonRadio>
          </IonItemGroup>
          <IonItemGroup>
            <IonRadio value="Equipo">
              <code>Equipo</code>
            </IonRadio>
            <IonItem>
              <IonRadio value="Equipo">
                <code>Equipo 1</code>
              </IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="Equipo">
                <code>Equipo 2</code>
              </IonRadio>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonRadio value="Instalaciones">
              <code>Instalaciones</code>
            </IonRadio>
          </IonItemGroup>
          <IonItemGroup>
            <IonRadio value="Cerrar Sesión">
              <code>Cerrar Sesión</code>
            </IonRadio>
          </IonItemGroup>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
            <IonButtons slot="end" style={{ marginRight: "8px" }}>
              <IonIcon slot="icon-only" icon={person}></IonIcon>
              {/* color="light" */}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};
export default Menu;
