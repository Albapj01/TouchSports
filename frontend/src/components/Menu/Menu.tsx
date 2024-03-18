import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  calendar,
  people,
  business,
  fileTrayFull,
  logOut,
} from "ionicons/icons";
import { Link } from "react-router-dom";

const Menu = () => {
  const [showDropDown, setDropDown] = useState(false);

  const handleDropDownClick = () => {
    setDropDown(!showDropDown);
  };

  return (
    <>
      <GlobalStyle />
      <IonMenu contentId="main-content">
        <IonContent color="primary">
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
          <StyledIonItem color="primary">
            <Icon icon={calendar} />
            Calendario
          </StyledIonItem>
          <StyledIonItem color="primary" button onClick={handleDropDownClick}>
            <Icon icon={people} />
            <StyledLink to="/home/team">Equipo</StyledLink>
          </StyledIonItem>
          {showDropDown && (
            <IonList className="no-margin-padding">
              <StyledIonItem color="primary"> Equipo 1</StyledIonItem>
              <StyledIonItem color="primary"> Equipo 2</StyledIonItem>
            </IonList>
          )}
          <StyledIonItem color="primary">
            <Icon icon={business} />
            <StyledLink to="/home/centres">Instalaciones</StyledLink>
          </StyledIonItem>
          <StyledIonItem color="primary">
            <Icon icon={fileTrayFull} />
            <StyledLink to="">Reservas</StyledLink>
          </StyledIonItem>
          <StyledIonItem color="primary">
            <Icon icon={logOut} />
            <StyledLink to="/sign-in">Cerrar Sesión</StyledLink>
          </StyledIonItem>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <GlobalStyle />
        <IonHeader color="primary">
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton color="light"></IonMenuButton>
            </IonButtons>
            <TitleContainer>
              <IonTitle>TouchSports</IonTitle>
            </TitleContainer>
            <LogoImage
              slot="end"
              src={require("../../assets/images/toolbar-image.png")}
            />
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
