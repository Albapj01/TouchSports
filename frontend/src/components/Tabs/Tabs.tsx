import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

import { home, person } from "ionicons/icons";

const Tabs: React.FC = () => {
  return (
    <IonTabBar slot="bottom" color="primary">
      <IonTabButton tab="home">
        <IonIcon icon={home} color="light" />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton tab="profile">
        <IonIcon icon={person} color="light" />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
export default Tabs;
