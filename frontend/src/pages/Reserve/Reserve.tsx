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
import styled, { createGlobalStyle } from "styled-components";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import MultiSelect from "frontend/src/components/multi-select/multi-select";
import Segment from "frontend/src/components/segment/segment";
import DateTime from "frontend/src/components/datetime/datetime";
import ToolBar from "frontend/src/components/toolbar/toolbar";

const Reserve = () => {
  const [name, setName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [material, setMaterial] = useState("");

  const [showOption, setShowOption] = useState(false);

  const handleShowClick = () => {
    setShowOption(!showOption);
  };

  // const [isEmailValid, setIsEmailValid] = useState(false);

  // const validationEmail = (email: String) => {
  //   const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   return validateEmail.test(String(email).toLowerCase());
  // };

  // const validationTelephone = (telephoneNumber: String) => {
  //   const validateTelephone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  //   return validateTelephone.test(String(telephoneNumber));
  // };

  // const handleButtonClick = () => {
  //   const isValid = validationEmail(email);
  //   setIsEmailValid(isValid);
  // };

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
              <Input />
              <IonText>¿Desea reservar algún tipo de material?</IonText>
              <Segment />
            </Margin>
          </IonList>
          <MultiSelect />
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
                  data: {
                    action: "delete",
                  },
                },
                {
                  text: "Reservar",
                  data: {
                    action: "reserve",
                  },
                },
                {
                  text: "Cancelar",
                  role: "cancel",
                  data: {
                    action: "cancel",
                  },
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
