import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

import { home, person } from "ionicons/icons";
import { useHistory } from "react-router-dom";

type TabProps = {
  disabled: boolean;
};

const Tabs = ({ disabled }: TabProps) => {
  const history = useHistory();

  const handleRedirectProfile = () => {
    if (!disabled) {
      history.push("/home/profile");
    }
  };

  const handleRedirectHome = () => {
    if (!disabled) {
      history.push("/home");
    }
  };

  return (
    <IonTabBar slot="bottom" color="primary">
      <IonTabButton tab="home" onClick={handleRedirectHome}>
        <IonIcon icon={home} color="light" />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" onClick={handleRedirectProfile}>
        <IonIcon icon={person} color="light" />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Tabs;
