import { IonDatetime, IonInput } from "@ionic/react";

const Input = () => {
  return (
    <>
      <IonInput
        label="Nombre"
        labelPlacement="floating"
        fill="outline"
        placeholder="Nombre"
      ></IonInput>
      <br></br>
      <IonInput
        label="Teléfono"
        labelPlacement="floating"
        fill="outline"
        placeholder="Teléfono"
      ></IonInput>
      <br></br>
      <IonInput
        label="Correo"
        labelPlacement="floating"
        fill="outline"
        placeholder="Correo"
      ></IonInput>
      <br></br>
    </>
  );
};
export default Input;
