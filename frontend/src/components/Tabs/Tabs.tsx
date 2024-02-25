import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonPage,
  IonFooter,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Route, Redirect } from "react-router";

import { playCircle, radio, library, search } from "ionicons/icons";
import Home from "frontend/src/pages/Home/Home";

const Tabs: React.FC = () => {
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" render={() => <Home />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Listen now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio">
            <IonIcon icon={radio} />
            <IonLabel>Radio</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};
export default Tabs;
