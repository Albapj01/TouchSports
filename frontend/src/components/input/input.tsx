import { IonInput } from "@ionic/react";
import styled from "styled-components";

const Input = () => {
  return (
    <>
      <InputContainer>
        <IonInput
          label="Nombre"
          labelPlacement="floating"
          fill="outline"
          placeholder="Nombre"
        />
      </InputContainer>
      <br />
      <InputContainer>
        <IonInput
          label="Teléfono"
          labelPlacement="floating"
          fill="outline"
          placeholder="Teléfono"
        />
      </InputContainer>
      <br />
      <InputContainer>
        <IonInput
          label="Correo"
          labelPlacement="floating"
          fill="outline"
          placeholder="Correo"
        />
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  border: solid lightgray;
  border-radius: 10px;
  padding-left: 2%;
`;

export default Input;
