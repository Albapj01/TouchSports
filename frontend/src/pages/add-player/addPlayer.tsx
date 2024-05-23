import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Avatar from "frontend/src/components/avatar/avatar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

interface RouteParams {
  teamId: string;
}

const AddPlayer = () => {
  const { teamId } = useParams<RouteParams>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [diet, setDiet] = useState("");
  const [technicalTraining, setTechnicalTraining] = useState("");
  const [physicalTraining, setPhysicalTraining] = useState("");
  const [improvements, setImprovements] = useState("");
  const [selectedTechnicalTraining, setSelectedTechnicalTraining] = useState<
    string[]
  >([]);
  const [selectedPhysicalTraining, setSelectedPhysicalTraining] = useState<
    string[]
  >([]);

  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));

  const handleAddPlayer = async () => {
    const id = uuidv4();
    const playerId = id.toString();

    const existingPlayer = await api.getPlayerById(
      payload.sub,
      teamId,
      playerId
    );

    const obtainedPlayerId =
      existingPlayer && existingPlayer.player ? existingPlayer.player.id : null;

    if (!obtainedPlayerId) {
      await api.createPlayer(
        payload.sub,
        teamId,
        playerId,
        name,
        surname,
        email,
        imageUrl,
        diet,
        technicalTraining,
        physicalTraining,
        improvements
      );
    }
  };

  const handleTechnicalTrainingSelection = (e: CustomEvent) => {
    setSelectedTechnicalTraining(e.detail.value);
    setTechnicalTraining(e.detail.value.join(", "));
  };

  const handlePhysicalTrainingSelection = (e: CustomEvent) => {
    setSelectedPhysicalTraining(e.detail.value);
    setPhysicalTraining(e.detail.value.join(", "));
  };

  const handleDiet = (e: CustomEvent) => {
    setDiet(e.detail.value);
  };

  const handleImprovement = (e: CustomEvent) => {
    setImprovements(e.detail.value);
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
          <PersonContainer>
            <Avatar
              route=""
              imageUrl="https://ionicframework.com/docs/img/demos/avatar.svg"
              name=""
              surname=""
            />
          </PersonContainer>
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
                label="Teléfono"
                placeholder="Teléfono"
                elements={(telephoneNumber) =>
                  setTelephoneNumber(telephoneNumber)
                }
                value={telephoneNumber}
              />
              <br />
              <Input
                label="Correo"
                placeholder="Correo"
                elements={(email) => setEmail(email)}
                value={email}
              />
              <Space />
              <IonText>Seleccione la dieta que debe seguir el jugador:</IonText>
              <Border>
                <IonItem>
                  <IonSelect
                    aria-label="diet"
                    placeholder="Selecciona una dieta"
                    value={diet}
                    onIonChange={handleDiet}
                  >
                    <IonSelectOption value="Ninguna">Ninguna</IonSelectOption>
                    <IonSelectOption value="Dieta para perder grasa">
                      Dieta para perder grasa
                    </IonSelectOption>
                    <IonSelectOption value="Dieta para aumentar la masa muscula">
                      Dieta para aumentar la masa muscula
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
              </Border>
              <Space />
              <IonText>
                Selecciona los elementos técnicos que debe realizar el jugador:
              </IonText>
              <Border>
                <IonItem>
                  <IonSelect
                    aria-label="technical-training"
                    placeholder="Selecciona los elementos técnicos que se realizarán:"
                    multiple={true}
                    value={selectedTechnicalTraining}
                    onIonChange={handleTechnicalTrainingSelection}
                  >
                    <IonSelectOption value="Ninguno">Ninguno</IonSelectOption>
                    <IonSelectOption value="Pases">Pases</IonSelectOption>
                    <IonSelectOption value="Fintas">Fintas</IonSelectOption>
                    <IonSelectOption value="Penalti">Penalti</IonSelectOption>
                    <IonSelectOption value="Tiros a puerta">
                      Tiros a puerta
                    </IonSelectOption>
                    <IonSelectOption value="Control del balón">
                      Control del balón
                    </IonSelectOption>
                    <IonSelectOption value="Tiros libres">
                      Tiros libres
                    </IonSelectOption>
                    <IonSelectOption value="Tiros a canasta">
                      Tiros a canasta
                    </IonSelectOption>
                    <IonSelectOption value="Entrada a canasta">
                      Entrada a canasta
                    </IonSelectOption>
                    <IonSelectOption value="Lanzamiento a portería">
                      Lanzamiento a portería
                    </IonSelectOption>
                    <IonSelectOption value="Lanzamiento de 7 metros">
                      Lanzamiento de 7 metros
                    </IonSelectOption>
                    <IonSelectOption value="Bloqueo">Bloqueo</IonSelectOption>
                    <IonSelectOption value="Recepción">
                      Recepción
                    </IonSelectOption>
                    <IonSelectOption value="Saque">Saque</IonSelectOption>
                    <IonSelectOption value="Remate">Remate</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </Border>
              <Space></Space>
              <IonText>
                Selecciona los elementos físicos que debe realizar el jugador:
              </IonText>
              <Border>
                <IonItem>
                  <IonSelect
                    aria-label="physical-training"
                    placeholder="Selecciona los elementos físicos que se realizarán:"
                    multiple={true}
                    value={selectedPhysicalTraining}
                    onIonChange={handlePhysicalTrainingSelection}
                  >
                    <IonSelectOption value="Ninguno">Ninguno</IonSelectOption>
                    <IonSelectOption value="Flexiones">
                      Flexiones
                    </IonSelectOption>
                    <IonSelectOption value="Abdominales">
                      Abdominales
                    </IonSelectOption>
                    <IonSelectOption value="Sentadillas">
                      Sentadillas
                    </IonSelectOption>
                    <IonSelectOption value="Planchas">Planchas</IonSelectOption>
                    <IonSelectOption value="Carrera continua">
                      Carrera continua
                    </IonSelectOption>
                    <IonSelectOption value="Sprints">Sprints</IonSelectOption>
                    <IonSelectOption value="Pesas">Pesas</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </Border>
              <Space />
              <IonText>
                Introduzca las mejoras que considere, o comentarios si así lo
                desea:
              </IonText>
              <TextAreaStyled
                label="Mejoras"
                labelPlacement="floating"
                fill="outline"
                value={improvements}
                onIonChange={handleImprovement}
              ></TextAreaStyled>
            </Margin>
          </IonList>
          <Space />
          <Button>
            <AddButton id="open-action-sheet">Añadir</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push("/home/team"),
                },
                {
                  text: "Añadir",
                  handler: () => {
                    handleAddPlayer();
                    history.push(`/home/teams/${teamId}`);
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push("/home/team/add-player"),
                },
              ]}
            ></IonActionSheet>
          </Button>
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const PersonContainer = styled.div`
  margin-bottom: 10%;
  margin-left: 34%;
`;

const Margin = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

const Button = styled.div`
  text-align: center;
  align-items: center;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const AddButton = styled(IonButton)`
  width: 30%;
`;

const Border = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
`;

const TextAreaStyled = styled(IonTextarea)`
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 8px;
`;

export default AddPlayer;
