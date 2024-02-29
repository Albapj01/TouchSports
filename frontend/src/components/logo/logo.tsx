import { IonImg } from "@ionic/react";
import styled from "styled-components";

//para la segunda opción se pone "../../assets/images/logo2.png"

const Logo = () => {
  return (
    <>
      <Container>
        <IonImg src={require("../../assets/images/logo.png")}></IonImg>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Logo;
