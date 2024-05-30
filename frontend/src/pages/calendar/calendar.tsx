import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import api from "frontend/src/utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { Reserve } from "frontend/src/utils/interfaces/Reserve";
import { format } from "date-fns";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Calendar = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const { payload } = decodeJwt(storage.get("token"));
        const obtainedReserves = await api.getTrainerReserves(payload.sub);
        setReserves(obtainedReserves.reserves);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
    fetchReserves();
  }, []);

  const hasReservation = (dateWithReserve: string) => {
    const date = new Date(dateWithReserve);
    const dateString = format(date, "yyyy-MM-dd");
    return reserves.some((reserve) => {
      const reserveStartDate = format(
        new Date(reserve.startReserve),
        "yyyy-MM-dd"
      );
      const reserveEndDate = format(new Date(reserve.endReserve), "yyyy-MM-dd");
      return dateString >= reserveStartDate && dateString <= reserveEndDate;
    });
  };

  const handleDateChange = (event: CustomEvent) => {
    const selectedDate = format(new Date(event.detail.value), "yyyy-MM-dd");
    const selectedReserve = reserves.find((reserve) => {
      const reserveStartDate = format(
        new Date(reserve.startReserve),
        "yyyy-MM-dd"
      );
      const reserveEndDate = format(new Date(reserve.endReserve), "yyyy-MM-dd");
      return (
        (selectedDate >= reserveStartDate && selectedDate <= reserveEndDate) ||
        selectedDate === reserveStartDate ||
        selectedDate === reserveEndDate
      );
    });
    if (selectedReserve) {
      history.push(window.location.href=`/home/reserves`);
    }
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu disabled={false}/>
          <TextContainer>
            <IonText>Calendario de reservas</IonText>
          </TextContainer>
          <CalendarContainer>
            <IonDatetime
              presentation="date"
              onIonChange={handleDateChange}
              highlightedDates={(dateWithReserve) => {
                if (hasReservation(dateWithReserve)) {
                  return {
                    textColor: "#ffffff",
                    backgroundColor: "#1f7189",
                  };
                }
                return undefined;
              }}
            />
          </CalendarContainer>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const CalendarContainer = styled.div`
  justify-content: center;
  display: flex;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
  font-size: 20px;
  font-weight: bold;
`;

export default Calendar;
