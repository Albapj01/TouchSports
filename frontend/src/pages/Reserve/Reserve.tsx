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
  IonToolbar,
} from "@ionic/react";
import styled from "styled-components";
import Menu from "frontend/src/components/menu/menu";
import { useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";

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
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar></IonToolbar>
          </IonHeader>
          <br></br>
          <Menu />
          <Image>
            <IonImg
              src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Palacio_Municipal_de_Deportes_Vista_Alegre_-_C%C3%B3rdoba_%28Espa%C3%B1a%29.jpg"
              alt="Polideportivo Córdoba"
            ></IonImg>
          </Image>
          <Space></Space>
          <IonList>
            <Margin>
              <IonItem>
                <IonInput
                  label="Nombre"
                  placeholder="Enter text"
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Número de teléfono"
                  type="number"
                  placeholder="612345678"
                  value={telephoneNumber}
                  onIonChange={(e) => setTelephoneNumber(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Correo"
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Material"
                  type="text"
                  placeholder="Material"
                  value={material}
                  onIonChange={(e) => setMaterial(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </Margin>
          </IonList>
          <Space></Space>
          <Button>
            <IonButton
              id="open-action-sheet"
              style={{ color: "white", "--ion-background-color": "#1f7189" }}
            >
              Reservar
            </IonButton>
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
  height: 300px;
  width: 300px;
  margin-left: 42px;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const Space = styled.div`
  margin-bottom: 15px;
`;

const Margin = styled.div`
  margin-right: 20px;
  margin-left: 5px;
`;

export default Reserve;
