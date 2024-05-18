import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import styled from "styled-components";

interface DateProps {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateTime = ({ setStartDate, setEndDate }: DateProps) => {
  const handleStartDate = (e: CustomEvent) => {
    const selectedDate = e.detail.value;
    setStartDate(selectedDate);
  };

  const handleEndDate = (e: CustomEvent) => {
    const selectedDate = e.detail.value;
    setEndDate(selectedDate);
  };

  return (
    <>
      <DateTimeContainer>
        <IonDatetimeButton
          datetime="startDatetime"
        ></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="startDatetime"
            onIonChange={handleStartDate}
          ></IonDatetime>
        </IonModal>
      </DateTimeContainer>
      <DateTimeContainer>
        <IonDatetimeButton
          datetime="endDatetime"
        ></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="endDatetime"
            onIonChange={handleEndDate}
          ></IonDatetime>
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
