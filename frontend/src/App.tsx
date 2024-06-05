import { Link, Redirect, Route, Router, Switch } from "react-router-dom";
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
import Calendar from "./pages/calendar/calendar";
import Diet from "./pages/diet/diet";
import Training from "./pages/training/training";
import decodeJwt, { storage } from "./utils/functions/storage";
import { TokenPayload } from "google-auth-library";

setupIonicReact();

const App: React.FC = () => {
  const token: string = storage.get("token");
  const decodedToken: TokenPayload = decodeJwt(token).payload;

  const isAuthenticated =
    token && decodedToken.iss === "https://accounts.google.com";

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact component={SignIn} />
          <Route
            path="/home"
            render={() =>
              isAuthenticated ? <HomeRoutes /> : <Redirect to="/" />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const HomeRoutes: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} />
        <Route path="/home/profile" component={Profile} />
        <Route path="/home/calendar" component={Calendar} />
        <Route path="/home/teams" component={Teams} />
        <Route path="/home/teams/:teamId" component={Team} />
        <Route path="/home/teams/:teamId/update-team" component={UpdateTeam} />
        <Route path="/home/teams/add-team" component={AddTeam} />
        <Route
          path="/home/teams/:teamId/player/:playerId"
          component={PlayerInfo}
        />
        <Route
          path="/home/teams/:teamId/player/:playerId/diet"
          component={Diet}
        />
        <Route
          path="/home/teams/:teamId/player/:playerId/training"
          component={Training}
        ></Route>
        <Route
          path="/home/teams/:teamId/player/:playerId/update-player"
          component={UpdatePlayer}
        />
        <Route path="/home/teams/:teamId/add-player" component={AddPlayer} />
        <Route path="/home/centres" component={CentresInfo} />
        <Route path="/home/centres/:centresId" component={CentreInfo} />
        <Route
          path="/home/centres/:centresId/update-centre"
          component={UpdateCentre}
        />
        <Route path="/home/centres/add-centres" component={AddCentres} />
        <Route
          path="/home/centres/:centresId/reserve"
          component={ReserveInfo}
        />
        <Route path="/home/reserves" component={Reserves} />
        <Route
          path="/home/reserves/:centresId/:reserveId/update-reserve"
          component={UpdateReserve}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
