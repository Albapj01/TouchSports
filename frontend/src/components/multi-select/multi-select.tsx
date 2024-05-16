import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";

interface MultiSelectProps {
  setMaterial: (material: string) => void;
}

const MultiSelect = ({setMaterial}: MultiSelectProps) => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleMaterialSelection = (e: CustomEvent) => {
    setSelectedMaterials(e.detail.value);
    setMaterial(e.detail.value.join(", "));
  };

  return (
    <SelectContainer>
      <IonList>
        <IonItem>
          <IonSelect
            aria-label="Material"
            placeholder="Selecciona el matrial a reservar"
            multiple={true}
            value={selectedMaterials}
            onIonChange={handleMaterialSelection}
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
  margin-bottom: 7%;
`;

export default MultiSelect;
