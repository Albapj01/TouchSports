import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useEffect, useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import MultiSelect from "frontend/src/components/multi-select/multi-select";
import Segment from "frontend/src/components/segment/segment";
import DateTime from "frontend/src/components/datetime/datetime";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Team } from "frontend/src/utils/interfaces/Team";
import decodeJwt, { storage } from "frontend/src/utils/funcions/storage";
import api from "frontend/src/utils/api/api";

interface RouteParams {
  centresId: string;
  reserveId: string;
}

const UpdateReserve = () => {
  const { centresId } = useParams<RouteParams>();
  const { reserveId } = useParams<RouteParams>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [teamId, setTeamId] = useState("");
  const [material, setMaterial] = useState("");
  const [startReserve, setStartReserve] = useState(new Date());
  const [endReserve, setEndReserve] = useState(new Date());

  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const history = useHistory();

  const [teams, setTeams] = useState<Team[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    api.getAllTeams(payload.sub).then((result) => setTeams(result.teams));
  }, []);

  useEffect(() => {
    const fetchReserveData = async () => {
      const existingReserve = await api.getReserveById(
        payload.sub,
        centresId,
        reserveId
      );
      if (existingReserve && existingReserve.reserve) {
        setName(existingReserve.reserve.name || "");
        setSurname(existingReserve.reserve.surname || "");
        setEmail(existingReserve.reserve.email || "");
        setTelephoneNumber(existingReserve.reserve.telephone || "");
        setTeamId(existingReserve.reserve.teamId || "");
        setMaterial(existingReserve.reserve.material || "");
        setStartReserve(existingReserve.reserve.startReserve || "");
        setEndReserve(existingReserve.reserve.endReserve || "");
      }
    };

    fetchReserveData();
  }, [payload.sub, centresId, reserveId]);

  const handleUpdateReserve = async () => {
    await api.updateReserve(
      payload.sub,
      centresId,
      reserveId,
      name,
      surname,
      email,
      telephoneNumber,
      teamId,
      material,
      startReserve,
      endReserve
    );
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu />
          <Image>
            <IonImg
              src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Palacio_Municipal_de_Deportes_Vista_Alegre_-_C%C3%B3rdoba_%28Espa%C3%B1a%29.jpg"
              alt="Polideportivo Córdoba"
            ></IonImg>
          </Image>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
              <br />
              <Input
                label="Apellidos"
                placeholder="Apellidos"
                elements={(surname) => setSurname(surname)}
                value={surname}
              />
              <br />
              <Input
                label="Correo"
                placeholder="Correo"
                elements={(email) => setEmail(email)}
                value={email}
              />
              <br />
              <Input
                label="Teléfono"
                placeholder="Teléfono"
                elements={(telephoneNumber) =>
                  setTelephoneNumber(telephoneNumber)
                }
                value={telephoneNumber}
              />
              <Space></Space>
              <IonText>Selecciona para qué equipo quieres la reserva</IonText>
              <SelectContainer>
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Teams"
                      placeholder="Selecciona un equipo"
                      value={teamId}
                      onIonChange={(e) => setTeamId(e.detail.value)}
                    >
                      {teams &&
                        teams.map((team) => (
                          <IonSelectOption
                            key={team.teamId}
                            value={team.teamId}
                          >
                            {team.name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </SelectContainer>
              <Space></Space>
              <IonText>¿Desea reservar algún tipo de material?</IonText>
              <Segment setShowMultiSelect={setShowMultiSelect} />
            </Margin>
          </IonList>
          {showMultiSelect && <MultiSelect setMaterial={setMaterial} />}
          <Space></Space>
          <Margin>
            <IonText>
              Seleccione el día y la hora de inicio y de fin de la reserva:
            </IonText>
            <DateTime
              setStartDate={setStartReserve}
              setEndDate={setEndReserve}
            />
            <Space></Space>
          </Margin>
          <Button>
            <IonButton id="open-action-sheet">Actualizar</IonButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push("/home/reserves"),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateReserve();
                    history.push(`/home/reserves`);
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push("/home/reserves"),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <br/>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const Button = styled.div`
  text-align: center;
  align-items: center;
`;

const Image = styled.div`
  height: 32%;
  width: 75%;
  margin-left: 12%;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const Margin = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

const SelectContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-left: -4%;
  margin-right: 4%;
  margin-top: 3%;
  margin-bottom: 7%;
`;

export default UpdateReserve;
