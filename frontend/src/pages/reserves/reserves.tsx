import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";
import { useEffect, useState } from "react";
import { Reserve } from "frontend/src/utils/interfaces/Reserve";
import { Centres } from "frontend/src/utils/interfaces/Centres";
import { Team } from "frontend/src/utils/interfaces/Team";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { close } from "ionicons/icons";

const Reserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [centres, setCentres] = useState<Centres[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api.getTrainerReserves(payload.sub).then((result) => {
      setReserves(result.reserves);
    });
  }, []);

  useEffect(() => {
    const fetchCentresAndTeams = async () => {
      try {
        const obtainedCentres = await api.getAllCentres(payload.sub);
        const obtainedTeams = await api.getAllTeams(payload.sub);
        setCentres(obtainedCentres.centres);
        setTeams(obtainedTeams.teams);
      } catch (error) {
        console.error("Error al obtener centros y equipos:", error);
      }
    };
    fetchCentresAndTeams();
  }, [reserves]);

  const centreName = (centreId: string) => {
    const centre = centres.find((centre) => centre.centresId === centreId);
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

  const handleShowReserveInfo = (reserve: Reserve) => {
    setSelectedReserve(reserve);
    setShowModal(true);
  };

  const handleDeleteReserve = async (
    trainerId: string,
    centresId: string,
    reserveId: string
  ) => {
    await api.deleteReserve(trainerId, centresId, reserveId);
    setShowModal(false);
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false}/>
          <Cards>
            {reserves.length > 0 ? (
              reserves.map((reserve) => (
                <IonCard
                  key={reserve.reserveId}
                  color="primary"
                  style={{ backgroundColor: "rgba(31, 113, 137, 0.8)" }}
                  onClick={() => handleShowReserveInfo(reserve)}
                >
                  <IonCardHeader>
                    <IonCardTitle>{centreName(reserve.centresId)}</IonCardTitle>
                    <IonCardSubtitle>
                      {teamName(reserve.teamId)}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {centreLocation(reserve.centresId)}
                    <br />
                    {format(
                      new Date(reserve.startReserve),
                      "MM/dd/yyyy HH:mm -"
                    )}
                    {format(new Date(reserve.endReserve), " MM/dd/yyyy HH:mm")}
                  </IonCardContent>
                </IonCard>
              ))
            ) : (
              <TextContainer>
                <IonText>Todavía no hay ninguna reserva.</IonText>
              </TextContainer>
            )}
          </Cards>
          <IonModal
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            initialBreakpoint={0.5}
            breakpoints={[0, 0.25, 0.5, 0.75]}
          >
            <ModalWrapper>
              <ModalHeader>
                <IonButton fill="clear" onClick={() => setShowModal(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </ModalHeader>
              <h2>
                {selectedReserve
                  ? `Reserva en ${centreName(selectedReserve.centresId)}`
                  : "Información de la Reserva"}
              </h2>
              <h4>
                {selectedReserve
                  ? `Equipo: ${teamName(selectedReserve.teamId)}`
                  : ""}
              </h4>
              <p>
                {selectedReserve
                  ? `Ubicación: ${centreLocation(selectedReserve.centresId)}`
                  : ""}
              </p>
              <p>
                {selectedReserve
                  ? `Inicio reserva: ${format(
                      new Date(selectedReserve.startReserve),
                      "MM/dd/yyyy HH:mm"
                    )}`
                  : ""}
              </p>
              <p>
                {selectedReserve
                  ? `Fin reserva: ${format(
                      new Date(selectedReserve.endReserve),
                      "MM/dd/yyyy HH:mm"
                    )}`
                  : ""}
              </p>
              <p>
                {selectedReserve
                  ? `Material reservado: ${selectedReserve.material}`
                  : ""}
              </p>
              <IonButton
                onClick={() => {
                  history.push(
                    window.location.href =`/home/reserves/${selectedReserve?.centresId}/${selectedReserve?.reserveId}/update-reserve`
                  );
                  setShowModal(false);
                }}
              >
                Actualizar
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => {
                  handleDeleteReserve(
                    selectedReserve?.trainerId || "",
                    selectedReserve?.centresId || "",
                    selectedReserve?.reserveId || ""
                  );
                  history.push(`/home/reserves`);
                }}
              >
                Borrar
              </IonButton>
            </ModalWrapper>
          </IonModal>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1%;
`;

const ModalWrapper = styled.div`
  width: 80%;
  max-width: 80%;
  margin: 0 auto;
  max-height: 80%;
  overflow-y: auto;
`;

const TextContainer = styled.div`
  text-align: center;
  color: #666;
  margin-top: 5%;
  font-size: 20px;
  font-weight: bold;
`;

export default Reserves;
