import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import Home from "./pages/home/home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CentresInfo from "./pages/centres/centres";
import Team from "./pages/team/team";
import Profile from "./pages/profile/profile";
import SignIn from "./pages/sign-in/signIn";
import PlayerInfo from "./pages/player/player";
import AddPlayer from "./pages/add-player/addPlayer";
import Teams from "./pages/teams/teams";
import AddTeam from "./pages/add-team/addTeam";
import AddCentres from "./pages/add-centres/addCentres";
import CentreInfo from "./pages/centre-info/centreInfo";
import ReserveInfo from "./pages/reserve/reserve";
import Reserves from "./pages/reserves/reserves";
import UpdateTeam from "./pages/update-team/updateTeam";
import UpdateCentre from "./pages/update-centre/updateCentre";
import UpdatePlayer from "./pages/update-player/updatePlayer";
import UpdateReserve from "./pages/update-reserve/updateReserve";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/home/profile" component={Profile} />
        <Route path="/home/teams" component={Teams} />
        <Route path="/home/teams/:teamId" component={Team} />
        <Route path="/home/teams/:teamId/update-team" component={UpdateTeam} />
        <Route path="/home/teams/add-team" component={AddTeam}/>
        <Route path="/home/teams/:teamId/player/:playerId" component={PlayerInfo} />
        <Route path="/home/teams/:teamId/player/:playerId/update-player" component={UpdatePlayer} />
        <Route
          path="/home/teams/:teamId/add-player"
          component={AddPlayer}
        />
        <Route path="/home/centres" component={CentresInfo} />
        <Route path="/home/centres/:centresId" component={CentreInfo} />
        <Route path="/home/centres/:centresId/update-centre" component={UpdateCentre} />
        <Route path="/home/centres/add-centres" component={AddCentres} />
        <Route path="/home/centres/:centresId/reserve" component={ReserveInfo} />
        <Route path="/home/reserves" component={Reserves} />
        <Route path="/home/reserves/:centresId/:reserveId/update-reserve" component={UpdateReserve} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
