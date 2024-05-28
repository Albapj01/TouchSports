import {
  IonButton,
  IonContent,
  IonActionSheet,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonList,
  IonPage,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { useEffect, useState } from "react";
import api from "frontend/src/utils/api/api";
import { useHistory, useParams } from "react-router-dom";
import Input from "frontend/src/components/input/input";

const UpdateTrainer = () => {
  const { trainerId } = useParams<{ trainerId: string }>();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const { payload } = decodeJwt(storage.get("token"));
  const picture = payload.picture;

  useEffect(() => {
    if (trainerId) {
      const fetchTrainerData = async () => {
        try {
          const response = await api.getTrainerById(trainerId);
          const existingTrainer = response.json();
          if (existingTrainer && existingTrainer.trainer) {
            setName(existingTrainer.trainer.name || "");
            setSurname(existingTrainer.trainer.surname || "");
            setEmail(existingTrainer.trainer.email || "");
          }
        } catch (error) {
          console.error("Error al obtener datos del entrenador:", error);
        }
      };
      fetchTrainerData();
    } else {
      console.error("El usuario no existe.");
    }
  }, [trainerId]);

  const handleUpdateTrainer = async () => {
    if (trainerId) {
      await api.updateTrainer(trainerId, name, surname, email);
    } else {
      console.error("El usuario no existe.");
    }
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false}/>
          <Margin />
          <ImageContainer>
            <Image src={picture} />
          </ImageContainer>
          <IonList className="no-margin-padding">
            <MarginList>
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
                label="Email"
                placeholder="Email"
                elements={(email) => setEmail(email)}
                value={email}
              />
            </MarginList>
          </IonList>
          <Space />
          <Button>
            <AddButton id="open-action-sheet">Actualizar</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push(`/home/profile`),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateTrainer();
                    history.push(`/home/profile`);
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push(`/home/profile`),
                },
              ]}
            ></IonActionSheet>
          </Button>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const Image = styled.img`
  border-radius: 50%;
  width: 40%;
`;

const ImageContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-bottom: 10%;
`;

const Margin = styled.div`
  margin-top: 15%;
`;

const Space = styled.div`
  margin-top: 10%;
`;

const MarginList = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

const FabContainer = styled.div`
  margin-top: 10%;
`;

const TransparentFabButton = styled(IonFabButton)`
  --background: transparent;
  --box-shadow: none;
`;

const Button = styled.div`
  text-align: center;
  align-items: center;
`;

const AddButton = styled(IonButton)`
  width: 30%;
`;

export default UpdateTrainer;
