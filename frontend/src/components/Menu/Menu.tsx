import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  calendar,
  people,
  business,
  fileTrayFull,
  logOut,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { Team } from "frontend/src/utils/interfaces/Team";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";

type MenuProps = {
  disabled: boolean;
};

const Menu = ({ disabled }: MenuProps) => {
  const [showDropDown, setDropDown] = useState(false);

  const handleDropDownClick = () => {
    setDropDown(!showDropDown);
  };

  const [teams, setTeams] = useState<Team[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const result = await api.getAllTeams(payload.sub);
        setTeams(result.teams);
      } catch (error) {
        console.error("Error al obtener equipos:", error);
      }
    };
    fetchTeams();
  }, []);

  if (disabled) {
    return null; 
  }

  return (
    <>
      <GlobalStyle />
      <IonMenu contentId="main-content" >
        <IonContent content="main-content" color="primary">
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
          <StyledIonItem color="primary">
            <Icon icon={calendar} />
            <StyledLink to="/home/calendar">Calendario</StyledLink>
          </StyledIonItem>
          <StyledIonItem color="primary" button onClick={handleDropDownClick}>
            <Icon icon={people} />
            <StyledLink to="/home/teams">Equipo</StyledLink>
          </StyledIonItem>
          {showDropDown && (
            <IonList className="no-margin-padding">
              {teams.map((team, index) => (
                <StyledIonItem key={index} color="primary">
                  <Icon icon={""} />
                  <StyledLink to={`/home/teams/${team.teamId}`}>
                    {team.name}
                  </StyledLink>
                </StyledIonItem>
              ))}
            </IonList>
          )}
          <StyledIonItem color="primary">
            <Icon icon={business} />
            <StyledLink to="/home/centres">Instalaciones</StyledLink>
          </StyledIonItem>
          <StyledIonItem color="primary">
            <Icon icon={fileTrayFull} />
            <StyledLink to="/home/reserves">Reservas</StyledLink>
          </StyledIonItem>
          <StyledIonItem color="primary">
            <Icon icon={logOut} />
            <StyledLink to="/sign-in">Cerrar Sesión</StyledLink>
          </StyledIonItem>
        </IonContent>
      </IonMenu>
      <div id="main-content"></div>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
    :root {
      --ion-color-primary: #1f7189;
    }

    .no-margin-padding {
      margin: 0 !important;
      padding: 0 !important;
    }

    ion-item {
      border-color: white !important;
    }

  `;

const TitleContainer = styled.div`
  text-align: center;
  align-items: center;
`;

const LogoImage = styled(IonImg)`
  width: 10%;
  height: 10%;
  margin-right: 2%;
`;

const Icon = styled(IonIcon)`
  margin-right: 2%;
  color: light;
`;

const StyledIonItem = styled(IonItem)`
  color: primary;
  border: 1px solid #ccc;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

export default Menu;
