import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import MultiSelect from "frontend/src/components/multi-select/multi-select";
import Segment from "frontend/src/components/segment/segment";
import DateTime from "frontend/src/components/datetime/datetime";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Reserve = () => {
  const [name, setName] = useState("");
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
              />
              <br />
              <Input
                label="Teléfono"
                placeholder="Teléfono"
                elements={(telephoneNumber) => setTelephoneNumber(telephoneNumber)}
              />
              <br />
              <Input
                label="Correo"
                placeholder="Correo"
                elements={(email) => setEmail(email)}
              />
              <Space></Space>
              <IonText>¿Desea reservar algún tipo de material?</IonText>
              <Segment setShowMultiSelect={setShowMultiSelect} />
            </Margin>
          </IonList>
          {showMultiSelect && <MultiSelect />}
          <Space></Space>
          <Margin>
            <IonText>Seleccione el día y la hora:</IonText>
            <DateTime />
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
                  handler: () => history.push(""),
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => history.push("/home/centres/reserve"),
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

export default Reserve;
