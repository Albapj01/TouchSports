import { IonInput } from "@ionic/react";
import styled from "styled-components";

type InputProps = {
  label: string;
  placeholder: string;
  elements: (value: string) => void;
};

const Input = ({ label, placeholder, elements }: InputProps) => {
  const validation = (event: CustomEvent) => {
    if (label == "Teléfono") {
      const telephoneNumber = event.detail.value as string;
      if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(telephoneNumber)) {
        console.log(`${label} no válido`);
      }
      elements(telephoneNumber);
    } else if (label == "Correo") {
      const email = event.detail.value as string;
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        console.log(`${label} no válido`);
      }
      elements(email);
    } else {
      const name = event.detail.value as string;
      elements(name);
    }
  };

  return (
    <>
      <InputContainer>
        <IonInput
          label={label}
          labelPlacement="floating"
          fill="outline"
          placeholder={placeholder}
          onIonChange={validation}
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
