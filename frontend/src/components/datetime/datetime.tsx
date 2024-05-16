import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import styled from "styled-components";

interface DateProps {
  setDate: (date: Date) => void;
}

const DateTime = ({ setDate }: DateProps) => {
  const handleDateChange = (e: CustomEvent) => {
    const selectedDate = e.detail.value;
    setDate(selectedDate);
  };

  return (
    <>
      <DateTimeContainer>
        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetime"
            onIonChange={handleDateChange}
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
