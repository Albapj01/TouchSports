import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import api from "frontend/src/utils/api/api";
import { useEffect, useState } from "react";
import { Reserve } from "frontend/src/utils/interfaces/Reserve";
import { Centres } from "frontend/src/utils/interfaces/Centres";
import { Team } from "frontend/src/utils/interfaces/Team";
import { format } from 'date-fns';

const Reserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [centres, setCentres] = useState<Centres[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api.getTrainerReserves(payload.sub).then((result) => {
      setReserves(result.reserves);
    });
    console.log(reserves);
  }, []);

  useEffect(() => {
    const fetchCentresAndTeams = async () => {
      const obtainedCentres = await api.getAllCentres(payload.sub);
      const obtainedTeams = await api.getAllTeams(payload.sub); 
      setCentres(obtainedCentres.centres);
      setTeams(obtainedTeams.teams);
    };
    fetchCentresAndTeams();
  }, [reserves]); 

  const centreName = (centreId: string) => {
    const centre = centres.find((centre) => centre.centresId === centreId);
    console.log(centre);
    return centre ? centre.name : "";
  };

  const centreLocation = (centreId: string) => {
    const centre = centres.find((centre) => centre.centresId === centreId);
    return centre ? centre.location : "";
  };

  const teamName = (teamId: string) => {
    const team = teams.find((team) => team.teamId === teamId);
    return team ? team.name : "";
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          <Cards>
            {reserves &&
              reserves.map((reserve) => (
                <IonCard key={reserve.reserveId} color="primary" style={{ backgroundColor: 'rgba(31, 113, 137, 0.8)' }}>
                  <IonCardHeader>
                    <IonCardTitle>{centreName(reserve.centresId)}</IonCardTitle>
                    <IonCardSubtitle>
                      {teamName(reserve.teamId)}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {centreLocation(reserve.centresId)}
                    <br />
                    {format(reserve.date, 'MM/dd/yyyy HH:mm')}
                  </IonCardContent>
                </IonCard>
              ))}
          </Cards>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Cards = styled.div`
  text-align: left;
  align-items: center;
  /* height: 80%; */
`;

export default Reserves;
