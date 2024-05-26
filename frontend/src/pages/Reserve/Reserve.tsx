import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonInput,
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
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";
import { v4 as uuidv4 } from "uuid";

const ReserveInfo = () => {
  const { centresId } = useParams<{ centresId: string }>();

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
    const fetchTeams = async () => {
      try {
        api.getAllTeams(payload.sub).then((result) => setTeams(result.teams));
      } catch (error) {
        console.error("Error al obtener equipos:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleAddReserve = async () => {
    const id = uuidv4();
    const reserveId = id.toString();
    if (centresId) {
      const existingReserve = await api.getReserveById(
        payload.sub,
        centresId,
        reserveId
      );

      const obtainedReserveId =
        existingReserve && existingReserve.reserve
          ? existingReserve.reserve.id
          : null;

      if (!obtainedReserveId) {
        await api.createReserve(
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
      }
    } else {
      console.error("El centro no existe.");
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
          <Space></Space>
          <Button>
            <IonButton id="open-action-sheet">Reservar</IonButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push("/home/centres"),
                },
                {
                  text: "Reservar",
                  handler: () => {
                    handleAddReserve();
                    history.push(`/home/centres/${centresId}`);
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push("/home/centres/reserve"),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <br />
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

export default ReserveInfo;
