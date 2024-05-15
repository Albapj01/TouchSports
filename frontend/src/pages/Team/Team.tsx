import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import styled from "styled-components";
import Avatar from "frontend/src/components/avatar/avatar";
import Tabs from "frontend/src/components/tabs/tabs";
import Menu from "frontend/src/components/menu/menu";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Button from "frontend/src/components/button/button";
import { personAdd } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Player } from "frontend/src/utils/interfaces/Player";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import { useEffect, useState } from "react";
import api from "frontend/src/utils/api/api";

interface RouteParams {
  teamId: string;
}

const Team = () => {
  const { teamId } = useParams<RouteParams>();

  const [players, setPlayers] = useState<Player[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api
      .getAllPlayers(payload.sub, teamId)
      .then((result) => setPlayers(result.players));
    console.log(players);
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <PersonsContainer>
            {players &&
              players.map((player) => (
                <Person>
                  <AvatarContainer>
                    <Avatar
                      key={player.playerId}
                      route={`/home/teams/${teamId}/player`}
                      imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
                      name={player.name}
                      surname={player.surname}
                    />
                  </AvatarContainer>
                </Person>
              ))}
          </PersonsContainer>
          <Space />
          <ButtonContainer>
            <Link to={`/home/teams/${teamId}/add-player`}>
              <Button color="primary" icon={personAdd} text="Añadir jugador" />
            </Link>
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const PersonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8%;
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

const Person = styled.div`
  flex-direction: row;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const AvatarContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column; 
  align-items: center; 
`;

export default Team;
