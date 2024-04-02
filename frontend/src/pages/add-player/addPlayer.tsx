import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonList,
  IonPage,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import Avatar from "frontend/src/components/avatar/avatar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [surNames, setSurNames] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const history = useHistory();

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
            />
          </PersonContainer>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre"
                placeholder="Nombre"
                elements={(name) => setName(name)}
              />
              <br />
              <Input
                label="Apellidos"
                placeholder="Apellidos"
                elements={(surNames) => setSurNames(surNames)}
              />
              <br />
              <Input
                label="Teléfono"
                placeholder="Teléfono"
                elements={(telephoneNumber) =>
                  setTelephoneNumber(telephoneNumber)
                }
              />
              <br />
              <Input
                label="Correo"
                placeholder="Correo"
                elements={(email) => setEmail(email)}
              />
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
                  handler: () => history.push(""),
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

export default AddPlayer;
