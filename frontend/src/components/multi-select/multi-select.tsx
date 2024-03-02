import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import styled from "styled-components";

const MultiSelect = () => {
  return (
    <SelectContainer>
      <IonList>
        <IonItem>
          <IonSelect
            aria-label="Material"
            placeholder="Selecciona el matrial a reservar"
            multiple={true}
          >
            <IonSelectOption value="Pelotas de fútbol">
              Pelotas de fútbol
            </IonSelectOption>
            <IonSelectOption value="Pelotas de baloncesto">
              Pelotas de baloncesto
            </IonSelectOption>
            <IonSelectOption value="Petos">Petos</IonSelectOption>
            <IonSelectOption value="Conos">Conos</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-left: 7%;
  margin-right: 13%;
  margin-top: 3%;
`;

export default MultiSelect;
