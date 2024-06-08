import {
  IonActionSheet,
  IonAlert,
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
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showTelephoneAlert, setShowTelephoneAlert] = useState(false);

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

  const validationEmail = (email: String) => {
    const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return validateEmail.test(String(email).toLowerCase());
  };

  const validationTelephone = (telephoneNumber: String) => {
    const validateTelephone = /^[9|6|7][0-9]{8}$/;
    return validateTelephone.test(String(telephoneNumber));
  };

  const handleAddReserve = async () => {
    if(name == "" || surname == "" || email == "" || teamId == ""){
      return setShowAlert(true);
    }

    if(!validationEmail(email)){
      return setShowEmailAlert(true);
    }

    if(!validationTelephone(telephoneNumber) && telephoneNumber!=""){
      return setShowTelephoneAlert(true);
    }

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
      history.push(window.location.href=`/home/centres/${centresId}`);
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
          <Menu disabled={false}/>
          <Image>
            <IonImg
              src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Palacio_Municipal_de_Deportes_Vista_Alegre_-_C%C3%B3rdoba_%28Espa%C3%B1a%29.jpg"
              alt="Polideportivo Córdoba"
            ></IonImg>
          </Image>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre (Obligatorio)"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
              <br />
              <Input
                label="Apellidos (Obligatorio)"
                placeholder="Apellidos"
                elements={(surname) => setSurname(surname)}
                value={surname}
              />
              <br />
              <Input
                label="Correo (Obligatorio)"
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
              <IonText>Selecciona para qué equipo quieres la reserva (Obligatorio):</IonText>
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
              Seleccione el día y la hora de inicio y de fin de la reserva (Obligatorio):
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
                  handler: () => history.push(window.location.href="/home/centres"),
                },
                {
                  text: "Reservar",
                  handler: () => {
                    handleAddReserve();
                  },
                },
                {
                  text: "Seguir editando",
                  role: "cancel",
                  handler: () => history.push(`/home/centres/${centresId}/reserve`),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <br />
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message="El nombre, los apellidos, el correo, el equipo y el horario son obligatorios. Si no se selecciona un horario, este se pondrá por defecto con el día y la hora actuales."
            buttons={["OK"]}
          />
          <IonAlert
            isOpen={showEmailAlert}
            onDidDismiss={() => setShowEmailAlert(false)}
            header="Formato de correo incorrecto"
            message="El correo debe ser similar a usuario@ejemplo.com o usuario@ejemplo.es"
            buttons={["OK"]}
          />
          <IonAlert
            isOpen={showTelephoneAlert}
            onDidDismiss={() => setShowTelephoneAlert(false)}
            header="Formato de teléfono incorrecto"
            message="El número de teléfono debe empezar por 6, 7 o 9 y debe estar seguido por 8 dígitos más"
            buttons={["OK"]}
          />
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
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
