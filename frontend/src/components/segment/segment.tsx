import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Segment = ({setShowMultiSelect,}: {setShowMultiSelect: Dispatch<SetStateAction<boolean>>;}) => {
  const changeSegment = (value: string) => {
    if (value === "segment") {
      setShowMultiSelect(true);
    } else {
      setShowMultiSelect(false);
    }
  };

  return (
    <SegmentContainer>
      <IonSegment
        value="default"
        onIonChange={(e) => changeSegment(String(e.detail.value))}
      >
        <IonSegmentButton value="default">
          <IonLabel>No</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="segment">
          <IonLabel>Sí</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </SegmentContainer>
  );
};

const SegmentContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-right: 5%;
  margin-top: 3%;
`;

export default Segment;
