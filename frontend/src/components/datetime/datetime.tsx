import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import styled from "styled-components";

const DateTime = () => {
  return (
    <>
      <DateTimeContainer>
        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

        <IonModal keepContentsMounted={true}>
          <IonDatetime id="datetime"></IonDatetime>
        </IonModal>
      </DateTimeContainer>
    </>
  );
};

const DateTimeContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-left: 7%;
  margin-right: 11%;
  margin-top: 4%;
`;

export default DateTime;
